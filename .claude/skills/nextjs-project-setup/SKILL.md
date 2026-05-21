---
name: nextjs-project-setup
description: Use this skill when the user wants to scaffold, initialize, or set up a new production-ready Next.js project with TypeScript, ESLint, and Prettier wired up using the latest stable versions (e.g. "set up a Next.js project", "scaffold Next.js", "new Next.js app", "add Prettier to Next.js", "add ESLint to Next.js", "Next.js starter setup"). Handles intake (project name, package manager, App vs Pages router, src/ preference, optional Tailwind), runs `create-next-app@latest`, layers Prettier + ESLint with conflict-free integration, configures TypeScript strict mode and path aliases, writes `.editorconfig` and `.vscode/settings.json`, verifies the setup with `tsc --noEmit` + lint + format:check, and prints a next-steps checklist.
---

# Next.js Project Setup

You are setting up a new, production-ready Next.js project end-to-end. Goal: when you hand off, the developer can run `npm run dev`, save a file, and see Prettier formatting + ESLint feedback working immediately — with strict TypeScript catching real bugs and no ESLint/Prettier conflicts fighting each other.

Work in **bash / PowerShell** end-to-end. Follow the steps in order. **Stop on any failure** — show the exact error, do not silently continue.

## Step 1 — Intake

Collect the four required inputs up front. If any are missing or ambiguous in the user's request, **bundle the missing ones into a single `AskUserQuestion` call** — don't ping the user multiple times. Also ask the Tailwind question here (one-shot intake).

Required inputs:

1. **Project name** — used as the directory name and `name` in `package.json`. Must be kebab-case, lowercase, no spaces.
2. **Package manager** — `npm`, `pnpm`, or `yarn`. Affects the `create-next-app` flag, the lockfile, and every install command in the rest of the skill.
3. **Router** — `App Router` (recommended for new projects) or `Pages Router`. Maps to `--app` or `--no-app` on `create-next-app`.
4. **`src/` directory** — yes or no. Maps to `--src-dir` or `--no-src-dir`. This also affects the TypeScript paths alias in Step 5.
5. **Tailwind CSS** — yes or no. If yes, we'll also install `prettier-plugin-tailwindcss` in Step 3.

If the user volunteered all of these in their original message, skip the question and proceed.

## Step 2 — Project scaffolding

Run `create-next-app@latest` with the user's choices. Use the package manager they selected — flags vary slightly per PM, but `create-next-app` accepts the same CLI args regardless.

```bash
# npm
npx create-next-app@latest <project-name> \
  --typescript \
  --eslint \
  --use-npm \
  --import-alias "@/*" \
  [--app | --no-app] \
  [--src-dir | --no-src-dir] \
  [--tailwind | --no-tailwind]

# pnpm
pnpm create next-app@latest <project-name> \
  --typescript --eslint --use-pnpm --import-alias "@/*" \
  [--app | --no-app] [--src-dir | --no-src-dir] [--tailwind | --no-tailwind]

# yarn
yarn create next-app@latest <project-name> \
  --typescript --eslint --use-yarn --import-alias "@/*" \
  [--app | --no-app] [--src-dir | --no-src-dir] [--tailwind | --no-tailwind]
```

After scaffolding, **verify it succeeded** before continuing:

```bash
cd <project-name>
ls package.json next.config.* tsconfig.json
```

All three should exist. If any are missing, **stop** and show the user the exit code / output from `create-next-app`. Don't try to patch over a failed scaffold.

From this point on, **all commands run inside `<project-name>/`**.

## Step 3 — Prettier setup

### 3a. Resolve the latest versions at runtime

**Never hardcode versions.** Fetch the latest stable version of each package from the npm registry, then install with exact pinning. Use whichever PM the user picked.

```bash
# Resolve latest versions (npm view works regardless of PM)
PRETTIER_VER=$(npm view prettier version)
ESLINT_CONFIG_PRETTIER_VER=$(npm view eslint-config-prettier version)
# Only if Tailwind was chosen:
PRETTIER_PLUGIN_TW_VER=$(npm view prettier-plugin-tailwindcss version)
```

### 3b. Install with exact pinning

Exact pinning = no `^` or `~` prefix. Tells the lockfile to lock to one specific version.

```bash
# npm
npm install --save-dev --save-exact prettier@$PRETTIER_VER eslint-config-prettier@$ESLINT_CONFIG_PRETTIER_VER
# + if Tailwind:
npm install --save-dev --save-exact prettier-plugin-tailwindcss@$PRETTIER_PLUGIN_TW_VER

# pnpm
pnpm add -D --save-exact prettier@$PRETTIER_VER eslint-config-prettier@$ESLINT_CONFIG_PRETTIER_VER
# + if Tailwind:
pnpm add -D --save-exact prettier-plugin-tailwindcss@$PRETTIER_PLUGIN_TW_VER

# yarn
yarn add -D --exact prettier@$PRETTIER_VER eslint-config-prettier@$ESLINT_CONFIG_PRETTIER_VER
# + if Tailwind:
yarn add -D --exact prettier-plugin-tailwindcss@$PRETTIER_PLUGIN_TW_VER
```

### 3c. `.prettierrc`

**Before writing, check if the file already exists.** If it does, ask the user before overwriting. Otherwise write:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "plugins": []
}
```

If Tailwind was chosen, `plugins` becomes `["prettier-plugin-tailwindcss"]` — this auto-sorts Tailwind class names according to the official recommended order.

> JSON doesn't support comments. Document the choices in the final summary instead — `singleQuote` matches typical JS/TS style, `trailingComma: "all"` produces cleaner diffs, `printWidth: 100` is a modern middle ground.

### 3d. `.prettierignore`

Check if it exists first; ask before overwriting. Otherwise write:

```
node_modules
.next
out
dist
build
coverage
*.log
```

### 3e. Scripts

Read `package.json`, then add these two scripts (preserve everything else):

```json
{
  "scripts": {
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md,css}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,js,jsx,json,md,css}\""
  }
}
```

- `format` rewrites files in place.
- `format:check` exits non-zero if anything would change — for CI.

## Step 4 — ESLint setup

### 4a. Detect ESLint version

`create-next-app` may install ESLint v8 (legacy config) or v9+ (flat config). Detect which:

```bash
node -p "require('./node_modules/eslint/package.json').version"
ls eslint.config.mjs .eslintrc.json 2>/dev/null
```

- ESLint **v9+** → expect `eslint.config.mjs` (flat config). Use the flat config snippet below.
- ESLint **v8** → expect `.eslintrc.json` (legacy config). Use the legacy snippet.

If neither file exists, something's wrong with the scaffold — stop and show the user.

### 4b. Flat config — `eslint.config.mjs` (ESLint v9+)

If the file exists, **ask before overwriting** (it likely contains the Next.js defaults that `create-next-app` wrote). Show the user the diff between current and proposed contents before replacing.

```js
// Flat ESLint config for Next.js (ESLint v9+).
// Order matters: Prettier config must come LAST so it can disable formatting
// rules from earlier configs that would conflict with Prettier's output.
import { FlatCompat } from '@eslint/eslintrc';
import prettierConfig from 'eslint-config-prettier';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default [
  // Next.js defaults: core-web-vitals catches perf/a11y issues,
  // next/typescript adds TS-aware rules including React hooks rules.
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

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
];
```

### 4c. Legacy config — `.eslintrc.json` (ESLint v8)

If the file exists, ask before overwriting. Otherwise:

```json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
    ],
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "prefer-const": "warn",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

> `"prettier"` here resolves to `eslint-config-prettier` and **must be the last entry** in `extends` — the order is what disables conflicting rules.

### 4d. Scripts

Add to `package.json` (preserve existing scripts):

```json
{
  "scripts": {
    "lint": "next lint",
    "lint:fix": "next lint --fix"
  }
}
```

> If Next.js prints a deprecation warning for `next lint` (Next 15+ is phasing it out), switch to `eslint .` / `eslint . --fix`. Only do this if you actually see the warning — don't pre-empt.

## Step 5 — TypeScript setup

Open `tsconfig.json`. `create-next-app` already enables strict mode by default, but verify and tighten:

1. **`compilerOptions.strict`** must be `true`. If it's missing or false, set it to `true`.
2. **`compilerOptions.paths`** — set the alias based on the user's `src/` choice:
   - With `src/`: `"@/*": ["./src/*"]`
   - Without `src/`: `"@/*": ["./*"]`
   - `compilerOptions.baseUrl` must be set to `"."` for paths to resolve.
3. **`include`** array — should cover the directories the router uses:
   - App Router with `src/`: `["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]` (this is the default `create-next-app` output — leave it).
   - Pages Router with `src/`: same default works.
   - The defaults from `create-next-app` are correct — only modify if something looks off.
4. **`exclude`** array — should include `["node_modules"]`. Leave it unless modified.

Make these edits surgically — read the file, modify only the keys above, preserve everything else. Do **not** rewrite the whole file.

## Step 6 — Editor config

### 6a. `.editorconfig`

Mirror Prettier so non-VS-Code editors also format consistently. Check if it exists; ask before overwriting.

```ini
# .editorconfig — keeps non-VS-Code editors in sync with Prettier settings.
# Docs: https://editorconfig.org/
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
# Markdown trailing whitespace can be meaningful (hard line breaks)
trim_trailing_whitespace = false
```

### 6b. `.vscode/settings.json`

Create `.vscode/` if missing. Check `settings.json`; ask before overwriting.

```json
{
  // Auto-save files after a short idle delay (1 second).
  // Other options: "off", "onFocusChange", "onWindowChange".
  // "afterDelay" is the most common — keeps the file in sync without losing focus.
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,

  // Format every save with Prettier (works in tandem with autoSave)
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  // Run ESLint auto-fixes on save (catches simple issues without manual triggers)
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },

  // Per-language: force Prettier even if another extension tries to claim the language
  "[javascript]":      { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[javascriptreact]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[typescript]":      { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[typescriptreact]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[json]":            { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[jsonc]":           { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[css]":             { "editor.defaultFormatter": "esbenp.prettier-vscode" },

  // Tell the ESLint extension which file types to lint inline
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
}
```

> **Note on `files.autoSave: "afterDelay"` + `editor.formatOnSave: true`** — VS Code's format-on-save *does* trigger on auto-save by default (since VS Code 1.82). So files will be auto-saved every 1s of idle, and Prettier will format them on each save. If the user prefers manual saves, change `files.autoSave` back to `"off"`.

> Assumes the user has the Prettier (`esbenp.prettier-vscode`) and ESLint (`dbaeumer.vscode-eslint`) VS Code extensions installed. Surface this in the final summary.

## Step 7 — Verification

Run **all three** checks. If any fails, **stop** and show the user the exact error output — do not silently continue, do not try to mask the failure.

```bash
# 1. TypeScript: zero type errors
npx tsc --noEmit

# 2. ESLint: zero lint errors
npm run lint          # or pnpm lint / yarn lint

# 3. Prettier: every file already formatted
npm run format:check  # or pnpm format:check / yarn format:check
```

If `format:check` fails, run `npm run format` once to auto-fix and re-run `format:check`. If it still fails, surface the diff.

If `lint` reports errors:

1. Run `npm run lint:fix` once.
2. Re-run `npm run lint`. If errors remain, they need real attention — show them to the user. Do not declare success.

Do **not** report the setup as complete unless all three checks pass.

## Step 8 — Hand-off summary + next steps

Print a clean summary covering exactly these sections:

**✅ Installed (dev dependencies, exact-pinned)**
- `prettier@<version>` — the formatter
- `eslint-config-prettier@<version>` — disables ESLint rules that conflict with Prettier
- `prettier-plugin-tailwindcss@<version>` *(only if Tailwind was chosen)* — auto-sorts Tailwind classes

**📄 Configs written**
- `.prettierrc`, `.prettierignore` — Prettier behavior
- `eslint.config.mjs` *(or `.eslintrc.json`)* — ESLint rules + Prettier integration
- `tsconfig.json` — verified strict mode + `@/*` path alias
- `.editorconfig` — editor-agnostic formatting baseline
- `.vscode/settings.json` — auto-save (after 1s idle) + format-on-save + ESLint fix-on-save

**📜 Scripts added to package.json**
```
<pm> run dev          # start dev server (http://localhost:3000)
<pm> run build        # production build
<pm> run start        # serve the production build
<pm> run lint         # check for lint errors
<pm> run lint:fix     # auto-fix what's fixable
<pm> run format       # apply Prettier to the repo
<pm> run format:check # verify everything is formatted (use in CI)
```
*(replace `<pm>` with npm / pnpm / yarn based on the user's choice)*

**⚠️ Warnings / manual steps**
- Install VS Code extensions: `esbenp.prettier-vscode` and `dbaeumer.vscode-eslint`.
- If `next lint` shows a deprecation warning, swap the scripts to `eslint .` and `eslint . --fix`.
- Surface any check warnings (vs. errors) from Step 7 here.

**🚀 Next steps checklist**
- [ ] `cd <project-name>` and `<pm> run dev` to confirm the dev server boots.
- [ ] Open the project in VS Code; install the two recommended extensions if prompted.
- [ ] Make a test edit + save — confirm Prettier auto-formats.
- [ ] Initialize git: `git init && git add . && git commit -m "Initial commit"`.
- [ ] Decide on a deployment target (Vercel, self-hosted, etc.) — out of scope for this skill.
- [ ] Add a testing framework (Vitest, Jest, Playwright) — out of scope for this skill.

## Hard rules

- **Never hardcode versions.** Resolve every dependency's latest version at runtime via `npm view <pkg> version`. The CLI command `create-next-app@latest` is the only allowed "version-ish" literal — and it explicitly means "resolve at runtime."
- **Always pin exactly in devDependencies.** Use `--save-exact` (npm/pnpm) or `--exact` (yarn) so the lockfile locks to a single version with no `^` / `~` prefix.
- **Never overwrite existing user files.** For every config file in Steps 3, 4, 5, 6 — check if it exists first. If it does, show the user the diff and ask before overwriting. The only exception is when the file was *just* written by `create-next-app` in this same run.
- **Comment non-obvious choices.** In `.editorconfig`, `eslint.config.mjs`, and `.vscode/settings.json`, explain *why* each non-obvious option exists. JSON files (`.prettierrc`, `.eslintrc.json`, `tsconfig.json`, `settings.json`) can't have comments — document those choices in the final summary instead. (`.vscode/settings.json` accepts JSONC, so comments are fine there.)
- **Stop on any failure.** If scaffold fails, install fails, `tsc --noEmit` fails, `lint` fails, or `format:check` fails — halt immediately and show the user the exact error. Never paper over.
- **One intake, not five.** Bundle all missing inputs into a single `AskUserQuestion` call. Don't drip-feed questions.
- **Stay in scope.** No Husky, lint-staged, commitlint, testing frameworks, CI pipelines, or deployment configs. The skill is: scaffold + Prettier + ESLint + TypeScript verification. Anything else is a separate request.
