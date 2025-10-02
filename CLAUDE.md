# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Sixui is a React component library implementing Google's Material Design 3 specification. It's organized as a pnpm monorepo using Nx for task orchestration.

## Package Manager

**IMPORTANT**: This project uses `pnpm` (version >= 9). The `preinstall` script enforces this with `only-allow pnpm`.

## Monorepo Structure

The repository contains multiple packages in `packages/`:

- **`@sixui/core`** - Main component library with 100+ Material Design 3 components
- **`@sixui/react-hook-form`** - React Hook Form integration for Sixui components
- **`@sixui/toolchain`** - Build tooling (Rollup, PostCSS, TypeScript compilation)
- **`@sixui/eslint-config`** - Shared ESLint configuration
- **`@sixui/prettier-config`** - Shared Prettier configuration
- **`@sixui/typescript-config`** - Shared TypeScript base configuration

### Nx Troubleshooting

If you encounter Nx errors like `(0 , native_1.isAiAgent) is not a function` or `ELIFECYCLE Command failed with exit code 1`, disable the Nx TUI before running commands:

```bash
export NX_TUI=false
```

## Development Commands

### Running Development Server

```bash
# Start Storybook for @sixui/core (port 6006)
pnpm dev
```

### Building

```bash
# Build all packages (respects dependency graph)
pnpm build

# Build specific package
nx run core:build
nx run react-hook-form:build
```

### Linting & Type Checking

```bash
# Run all checks across all packages
pnpm check:all

# This runs in each package:
# - lint:check (ESLint with auto-fix)
# - ts:check (TypeScript type checking)
```

### Individual Package Commands

Each package supports:

- `pnpm lint:check` - Lint with auto-fix
- `pnpm ts:check` - TypeScript type checking
- `pnpm check:all` - Both linting and type checking
- `pnpm clean` - Remove build artifacts

### Pre-commit Checks

The repository uses Husky pre-commit hooks that run:

1. `lint-staged` - Prettier formatting on staged files
2. `check:all` - Linting and type checking across all packages
3. `pre-commit` - Package-specific pre-commit tasks (e.g., icon generation in core)

### Release Management

```bash
# Preview release (dry run)
pnpm release:dry

# Publish release
pnpm release
```

Uses Nx release with conventional commits and GitHub releases.

## Core Package Architecture

### Component Organization

- **Source**: `packages/core/src/components/`
- Each component has its own directory with:
  - Component files (`.tsx`)
  - Styles using Vanilla Extract (`.css.ts`)
  - Storybook stories (`.stories.tsx`)
  - Type definitions (`.types.ts`)

### Theming System

The theming system is based on Material Design 3's dynamic color:

- **ThemeProvider**: Root component wrapping the app
- **Dynamic theming**: Supports runtime theme changes via context
- **Color schemes**: Light/dark mode variants
- **CSS Variables**: Theme tokens exposed via Vanilla Extract
- **Token system**: Uses `@material/material-color-utilities`

### Path Aliases

TypeScript is configured with `~/*` alias mapping to `src/*` in each package.

### Styling Approach

- **Vanilla Extract**: Type-safe CSS-in-TypeScript
- **Rainbow Sprinkles**: Utility-based styling system
- **PostCSS**: CSS processing with nesting and autoprefixer
- Global styles in `packages/core/src/styles/`

### Key Utilities

Located in `packages/core/src/utils/`:

- **colors/**: Color manipulation utilities
- **component/**: Component helper functions
- **css/**: CSS-related utilities (e.g., `partialAssignInlineVars`)
- Various helper functions for data manipulation, type guards, etc.

### Custom Hooks

Located in `packages/core/src/hooks/`:

- Form control hooks (`useCheckbox`, `useRadio`, `useSwitch`, `useSelect`)
- UI interaction hooks (`useRippleEffect`, `useDisclosure`, `useSideSheet`)
- Utility hooks (`useControlledValue`, `useMergeRefs`, `useClassName`)

### Icon Generation

SVG icons are automatically converted to React components:

```bash
pnpm generate-icons
```

This runs during the pre-commit hook for the core package.

## Build System

The `@sixui/toolchain` package provides the build infrastructure:

- **Rollup**: Module bundling with plugins for TypeScript, PostCSS, and Vanilla Extract
- **esbuild**: Fast TypeScript compilation
- **tsc-alias**: Path alias resolution after TypeScript compilation
- **TypeScript**: Declaration file generation

Build output goes to `dist/` in each package.

## Testing & Quality

- **ESLint**: Enforces React, TypeScript, accessibility, and code style rules
- **TypeScript**: Strict type checking enabled
- **Prettier**: Code formatting with import sorting
- **Storybook**: Component development and documentation environment

## Git Workflow

- **Commit conventions**: Uses conventional commits (@commitlint/config-conventional)
- **Branch naming**: Validated via `validate-branch-name`
- **Husky**: Git hooks for pre-commit validation
- **Main branch**: `main`

## Key Dependencies

- **React 19**: Peer dependency
- **Vanilla Extract**: CSS-in-TypeScript solution
- **Floating UI**: Positioning engine for popovers, tooltips, etc.
- **react-aria**: Accessible UI primitives
- **dnd-kit**: Drag and drop functionality
