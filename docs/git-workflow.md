# Git workflow & branch strategy

Enterprise-oriented branching: separate development, UAT, and production
flows, each promoted through a Pull Request — never pushed directly.

**Branches** (all protected: no deletion, no force-push, PR required):

| Branch        | Purpose                                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `main`        | Production baseline / release history — last validated, stable production version. Updated **only** after a successful production deployment. |
| `develop`     | Main integration branch — all completed features merge here first.                                                                            |
| `deploy/uat`  | Triggers the UAT deployment pipeline.                                                                                                         |
| `deploy/prod` | Triggers the production deployment pipeline. Requires PR + approval — production must never deploy accidentally.                              |

**Flow:**

```
feature/<name>  --PR-->  develop  --PR-->  deploy/uat  --PR + approval-->  deploy/prod  --successful deploy-->  main
```

- Feature branches: `feature/<feature-name>` (e.g. `feature/homepage-hero`,
  `feature/contact-form`), always branched from `develop`, always merged
  back to `develop` via PR.
- If a `deploy/prod` release fails, `main` stays on the previous stable
  version — it only advances on a _successful_ production deploy. (e.g.
  `deploy/prod` at `v1.3.0` fails → `main` stays at `v1.2.0`.)

**CI/CD per branch:** `develop` runs code-quality/integration checks;
`deploy/uat` runs the UAT deploy pipeline; `deploy/prod` runs the
production deploy pipeline; `main` is release history / stable baseline.
Pipeline steps (current + planned): install, lint, typecheck, test, build,
version validation, deployment automation, release tracking.

**Versioning:** semantic (`MAJOR.MINOR.PATCH`), tracked through CI/CD so
every environment maps to an exact release version; each deployed
environment must expose its running version. Ties into the `<version>`
prefix in commit messages (`docs/commit-convention.md`) — bump
`package.json` alongside the commit that earns a new version.

**Implemented as GitHub Actions:**

- `.github/actions/setup/` — composite action: Node 24, Corepack/Yarn,
  cache restore, `yarn install --immutable`. Used by every job below to
  avoid repeating the same 4 steps in each one.
- `.github/workflows/ci.yml` — lint, typecheck, unit tests, build, and e2e
  (Playwright, chromium only) run in parallel on PRs into `develop` /
  `deploy/uat` / `deploy/prod` / `main`, and on push to `develop` /
  `deploy/uat` / `deploy/prod`.
- `.github/workflows/deploy-uat.yml` — on push to `deploy/uat`: re-runs
  validation, then deploys to the Vercel UAT project via the Vercel CLI
  (`pull` → `build` → `deploy --prebuilt`), gated on the `uat` GitHub
  Environment.
- `.github/workflows/deploy-prod.yml` — on push to `deploy/prod`: re-runs
  validation, then deploys to the Vercel Production project the same way
  (with `--prod` flags), gated on the `production` GitHub Environment, then
  fast-forwards `main` to the deployed commit only after that job succeeds
  (mirrors the "main only advances on successful deploy" rule above — uses
  `git merge --ff-only`, refuses if history diverged).

**Still needs manual, GitHub-side setup (not something committed YAML can do):**

- Required reviewers configured on GitHub Environments (repo Settings →
  Environments): **`uat` has 0 required reviewers** (deploys automatically
  on push to `deploy/uat`, by design — that's the whole point of UAT being
  fast to iterate on) — **`production` has required reviewers** (that's
  what turns `environment: production` in the workflow into an actual
  manual-approval gate, matching the branch-strategy rule that prod must
  never deploy accidentally).
- Set `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` as secrets on
  **both** the `uat` and `production` Environments (same secret names,
  different values — `VERCEL_PROJECT_ID` differs because UAT and
  Production are separate Vercel projects, per root CLAUDE.md §6).
- Set the `UAT_SITE_URL` / `PRODUCTION_SITE_URL` repo variables.
