import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Allow unescaped entities in JSX for better readability
      'react/no-unescaped-entities': 'off',
      // Allow unused vars with underscore prefix
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // Allow setState in effects for specific patterns
      'react-hooks/set-state-in-effect': 'warn',
      // Allow incompatible libraries with warning
      'react-hooks/incompatible-library': 'warn',
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Additional ignores:
    'node_modules/**',
    'coverage/**',
    'dist/**',
  ]),
]);

export default eslintConfig;