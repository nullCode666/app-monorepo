# Revault Wallet

Expo Router powered mobile wallet with native tabs, Tamagui UI, and EAS-managed releases.

## Tech Stack

- Expo SDK 54 / React Native 0.81
- Expo Router with native tab navigation
- Tamagui design system
- TypeScript + ESLint (Expo config)
- Yarn 4 (via Corepack) for package management

## Project Structure

```text
.
├── app/
│   ├── _layout.tsx          # Root stack; registers tab shell and modal routes
│   ├── index.tsx            # Redirects to the default tab route
│   ├── (tabs)/              # Native tab navigator entry points
│   │   ├── _layout.tsx      # NativeTabs configuration
│   │   ├── wallet.tsx
│   │   ├── swap.tsx
│   │   ├── explorer.tsx
│   │   ├── developer.tsx
│   │   └── Explore/         # Example nested stack with search header
│   │       ├── _layout.tsx
│   │       └── index.tsx
│   └── settings.tsx         # Modal screen presented above the tab stack
├── core/                    # Shared configuration and domain logic
│   └── config.ts
├── app.config.ts            # Expo app configuration (reads env files)
├── tamagui.config.ts        # Tamagui theme and component setup
├── eas.json                 # Local EAS workflows
└── .github/workflows/       # CI pipelines (precheck, release)
```

## Environment Configuration

- Duplicate `.env.example` (if provided) or create `.env` for local secrets.
- Provide release metadata through `.env.version` for `APP_VERSION` and `APP_BUILD_NUMBER`.
- `app.config.ts` loads both files via `dotenv` so Expo and the native builds receive the values.

## Getting Started

```bash
corepack enable
corepack prepare yarn@4.10.3 --activate
yarn install --immutable --check-cache
```

Start the development server:

```bash
yarn start            # Expo CLI interactive menu
yarn dev:ios          # Start and target the iOS simulator
yarn dev:android      # Start and target the Android emulator
```

## Quality Gates

- `yarn lint` — ESLint checks
- `yarn typecheck` — TypeScript project validation

Both commands run in CI and should pass before opening PRs.

## Build & Release

- Configure Expo Application Services (EAS) credentials and an `EXPO_TOKEN` secret in GitHub.
- For ad-hoc local builds use `eas build --platform ios|android` (requires Expo login).
- Runtime versioning is driven by `APP_VERSION`/`APP_BUILD_NUMBER` environment variables consumed by both Expo config and native targets.

## Continuous Integration

- **Precheck** (`.github/workflows/precheck.yml`)
  - Triggers on pushes and pull requests to `main`.
  - Installs dependencies with Yarn 4, then runs ESLint and TypeScript checks.
- **Release Mobile** (`.github/workflows/release-mobile.yml`)
  - Exposed as a reusable workflow (`workflow_call`).
  - Requires `APP_VERSION` and `APP_BUILD_NUMBER` inputs.
  - Authenticates with Expo, publishes build metadata to EAS env, and executes `eas workflow:run` using `.eas/workflows/create-production-builds.yml` to create store-ready binaries.

## Contributing

1. Create a feature branch from `main`.
2. Run `yarn lint` and `yarn typecheck` before committing.
3. Open a PR; the precheck workflow will gate merges.
