import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Apostrophes typographiques omniprésentes dans les textes FR : la règle
      // ne détecte ici que des apostrophes parfaitement sûres en JSX (bruit pur).
      "react/no-unescaped-entities": "off",
    },
  },
]);

export default eslintConfig;
