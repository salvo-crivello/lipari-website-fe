/**
 * Turbopack breaks maplibre-gl's bundled worker (drops the sibling
 * maplibre-gl-shared.mjs relative import, silently killing vector tile
 * loading in both dev and production — see
 * https://github.com/vercel/next.js/issues/86495). Workaround: serve the
 * worker as an untouched static file instead of letting it get bundled,
 * and point maplibre-gl at it via setWorkerUrl(). Re-run on every
 * `yarn install` (postinstall) so this stays in sync with the installed
 * maplibre-gl version.
 */
import { copyFileSync, mkdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))
const srcDir = join(rootDir, "node_modules/maplibre-gl/dist")
const destDir = join(rootDir, "public/maplibre-gl")

mkdirSync(destDir, { recursive: true })

for (const file of ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"]) {
  copyFileSync(join(srcDir, file), join(destDir, file))
}

console.log("Copied maplibre-gl worker files to public/maplibre-gl/")
