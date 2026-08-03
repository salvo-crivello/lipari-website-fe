# Commit message convention

Conventional Commits, with a custom prefix format:

```
<version> <[JIRA-ID | GitHub-Issue]> <type>: <description>
```

- `<version>` — project version/release identifier (`v1.0.0`, `v0.2.0`, ...).
  Only bump `package.json` (and this prefix) when the commit changes the
  **deployed artifact's behavior** — see the bump rule below. Otherwise
  reuse the current version unchanged; never omit the prefix.
- `<[JIRA-ID | GitHub-Issue]>` — `[LIP-123]` or `[#42]`. Omit the brackets
  entirely if no task exists for the change.
- `<type>` — one of: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`,
  `style`, `build`, `ci`, `perf`.
- `<description>` — short, imperative (`add`, `fix`, `update`, not `added`/
  `fixes`), ideally under 72 chars. Describes intent, not a file list.

**Version bump rule** — versioning exists to let every environment map to
an exact release, so it only moves when what's actually shipped changes:

- **Bumps the version:** `feat` (minor), `fix` (patch), `perf` (patch),
  `refactor` (patch), `build` (patch — only if it changes the built
  artifact, e.g. bundler output; not for tooling-only build config).
- **Does not bump the version:** `chore`, `docs`, `style`, `test`, `ci` —
  these never touch what's deployed (CI workflow edits, formatting,
  documentation, test-only changes all land here). Reuse the current
  version in the commit prefix.

```
v1.0.0 [LIP-12] chore: setup frontend architecture and development tooling
v1.0.0 [#50] ci: add UAT and production deploy workflows
v1.1.0 [LIP-18] feat: implement home hero section
v1.1.1 [#34] fix: resolve responsive navigation issue
v1.1.1 [LIP-25] refactor: extract reusable section layout
v1.1.1 [#41] docs: update project architecture
```

One commit = one logical change. No generic descriptions (`update`,
`changes`, `fix stuff`).
