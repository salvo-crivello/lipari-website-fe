import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

// Note: `next/core-web-vitals` already registers eslint-plugin-jsx-a11y and its
// rules internally — adding it again here collides on the plugin key.
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // type alias only, never interface.
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      // Every type alias is T-prefixed: DeepPartial -> TDeepPartial.
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "typeAlias",
          format: ["PascalCase"],
          prefix: ["T"]
        }
      ]
    }
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "playwright-report/**",
    "test-results/**"
  ])
])

export default eslintConfig
