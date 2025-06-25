import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import globals from "globals";  // Add this import


const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "@typescript-eslint": "@typescript-eslint/eslint-plugin",
      "prettier": "prettier",
      "prettier-plugin-tailwindcss": "prettier-plugin-tailwindcss",
    },
    files: ["**/*.{js,mjs,cjs,ts,tsx,jsx}"],
    ignores: ["./dist/**/*"],
    languageOptions: { globals: globals.node },
    rules: {
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-empty-object-type": "error",
      eqeqeq: "off",
      "no-unused-vars": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      semi: ["error", "always"],
      "prettier/prettier": "error",
      "no-unused-expressions": "error",
      "@typescript-eslint/no-explicit-any": "error",
    },
  }
];

export default eslintConfig;
