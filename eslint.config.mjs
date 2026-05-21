// Flat ESLint config for Next.js (ESLint v9+).
// Order matters: Prettier config must come LAST so it can disable formatting
// rules from earlier configs that would conflict with Prettier's output.
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';

const eslintConfig = defineConfig([
  // Next.js defaults: core-web-vitals catches perf/a11y issues,
  // typescript adds TS-aware rules including React hooks rules.
  ...nextVitals,
  ...nextTs,

  // Override default ignores of eslint-config-next.
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),

  {
    rules: {
      // Warn (not error) on unused vars so devs aren't blocked mid-refactor.
      // The `_` prefix escape hatch is the convention for intentionally unused args.
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // Warn on stray console.* calls. Allow warn/error since those are
      // legitimate signals, not debugging leftovers.
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Encourage immutability where possible.
      'prefer-const': 'warn',

      // Warn — not error — on `any`. Lets devs ship while signalling tech debt.
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // MUST be last — disables ESLint rules that conflict with Prettier
  // (quotes, semi, indent, etc.). Without this, ESLint and Prettier
  // will fight on save.
  prettierConfig,
]);

export default eslintConfig;
