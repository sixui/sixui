# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Sixui is a React component library implementing Google's Material Design 3 specification. It's organized as a pnpm monorepo using Nx for task orchestration.

## Package Manager

**IMPORTANT**: This project uses `pnpm` (version >= 9). The `preinstall` script enforces this with `only-allow pnpm`.

## Monorepo Structure

The repository contains multiple packages in `packages/`:

- **`@sixui/core`** - Main component library with 110+ Material Design 3 components
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

**IMPORTANT**: Always use the correct release commands as documented below.

```bash
# Preview release (dry run) - ALWAYS run this first
pnpm release:dry

# Publish release - Use the -y flag to skip prompts
pnpm release -y
```

**Release Process:**

1. **Pre-release validation:**
   - Ensure working directory is clean (`git status`)
   - Ensure on main branch (`git branch --show-current`)
   - Pull latest changes (`git pull origin main`)
   - Verify all checks pass (`pnpm check`)
   - Ensure build succeeds (`pnpm build`)

2. **Preview release (required):**
   ```bash
   pnpm release:dry
   ```
   Review the output carefully:
   - Version bump calculations
   - Changelog entries
   - GitHub release details
   - Package metadata changes

3. **Execute release:**
   ```bash
   pnpm release -y
   ```
   The `-y` flag skips interactive prompts and proceeds with the release.

**What happens during release:**
- Analyzes conventional commits since last release
- Determines semantic version bumps (major/minor/patch)
- Runs `nx run-many -t build` to ensure all packages build
- Updates package.json versions across monorepo
- Generates CHANGELOG.md
- Creates git commit and tags
- Pushes to remote
- Creates GitHub release
- Publishes packages to npm registry

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
- **Color schemes**: Light/dark mode variants with optional localStorage persistence
- **CSS Variables**: Theme tokens exposed via Vanilla Extract
- **Token system**: Uses `@material/material-color-utilities`

#### Color Scheme Persistence & SSR

Sixui provides a complete SSR-safe color scheme system that prevents hydration mismatches:

**The Hydration Challenge:**
- Server renders with a default color scheme
- Client may have a different scheme stored in localStorage
- Without proper handling, this causes a flash of incorrect theme (FOIT) and hydration mismatches

**The Solution:**
Sixui uses a three-part approach:

1. **ColorSchemeScript** - Inline script placed in `<head>` that:
   - Executes before React hydration
   - Reads color scheme from localStorage
   - Sets `data-sixui-color-scheme` attribute on the root element
   - Prevents FOIT by applying the correct theme immediately

2. **ThemeProvider Dual CSS Generation** - Generates CSS variables for BOTH light and dark modes:
   - Base styles on the root selector
   - Light theme on `[data-sixui-color-scheme="light"]`
   - Dark theme on `[data-sixui-color-scheme="dark"]`
   - CSS automatically applies correct theme based on the attribute

3. **sixuiHtmlProps** - Utility for HTML element to suppress hydration warnings:
   ```tsx
   import { sixuiHtmlProps } from '@sixui/core';
   <html {...sixuiHtmlProps}>
   ```

**useColorScheme Hook:**
Provides methods to control color scheme from any component:
- `colorScheme` - Current scheme ('light' or 'dark')
- `setColorScheme(variant)` - Set specific scheme
- `toggleColorScheme()` - Toggle between light/dark

**ThemeProvider Props:**
- `enableColorSchemePersistence` - Enable localStorage persistence
- `defaultColorScheme` - Default scheme ('light', 'dark', or 'auto')
- `forceColorScheme` - Override user preference
- `colorSchemeManager` - Custom storage implementation (default: localStorage with cross-tab sync)

**Example for Next.js:**
```tsx
// app/layout.tsx
import { ColorSchemeScript, SixuiProvider, sixuiHtmlProps } from '@sixui/core';
import { Roboto } from 'next/font/google';
import '@sixui/core/styles.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className} {...sixuiHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <SixuiProvider
          theme={{
            tokens: {
              typeFace: {
                plain: 'Roboto',
                brand: 'Roboto',
              },
            },
          }}
          enableColorSchemePersistence
        >
          {children}
        </SixuiProvider>
      </body>
    </html>
  );
}

// Any component
import { useColorScheme, Switch } from '@sixui/core';

function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <Switch
      label="Dark mode"
      checked={colorScheme === 'dark'}
      onChange={toggleColorScheme}
    />
  );
}
```

**Color Scheme Manager:**
The color scheme storage is pluggable via the `colorSchemeManager` prop. The default `localStorageColorSchemeManager` provides:
- localStorage persistence
- Cross-tab synchronization
- SSR-safe implementation

Custom managers can be implemented following the `IColorSchemeManager` interface.

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

- **Theme & Color Scheme**:
  - `useColorScheme` - Manage color scheme (get, set, toggle)
  - `useTheme` - Access theme context
  - `useOsColorScheme` - Detect OS color scheme preference
- **Form control hooks**: `useCheckbox`, `useRadio`, `useSwitch`, `useSelect`, `useMultiSelect`
- **UI interaction hooks**: `useRippleEffect`, `useDisclosure`, `useSideSheet`, `useOverlays` (with instanceId support)
- **Browser APIs & Observers**:
  - `useMediaQuery` - Media query matching with SSR support
  - `useIntersection` - Intersection Observer API
  - `useElementSize` - Element size tracking
- **State & Storage**:
  - `useControlledValue` - Controlled/uncontrolled component state
  - `useLocalStorage` - SSR-safe localStorage with cross-tab sync
  - `useToggle`, `usePrevious` - Common state utilities
- **SSR & Hydration**:
  - `useHydrated` - Check if component is hydrated (client-side)
  - `useIsMounted` - Check if component is mounted
  - `useIsomorphicLayoutEffect` - SSR-safe layout effect
- **Other Utilities**:
  - `useMergeRefs` - Merge multiple refs
  - `useClassName` - Generate unique class names
  - `useTimeout` - Declarative timeout

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

## Example Applications

The repository includes example apps demonstrating Sixui usage:

- **`apps/example-nextjs`** - Next.js 15.5 app with SSR, color scheme persistence
- **`apps/example-vite`** - Vite app with React 19

Both examples demonstrate:
- Theme setup with ThemeProvider/SixuiProvider
- Color scheme persistence (Next.js example)
- Component usage and styling

## Key Dependencies

- **React 19**: Peer dependency
- **Next.js 15**: Used in example-nextjs app
- **Vanilla Extract**: CSS-in-TypeScript solution
- **Floating UI**: Positioning engine for popovers, tooltips, etc.
- **react-aria**: Accessible UI primitives
- **dnd-kit**: Drag and drop functionality
- **pnpm 10.17+**: Package manager
- **Nx 21.6**: Monorepo orchestration
