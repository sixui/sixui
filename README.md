<p align="center">
  <a href="https://sixui.com" rel="noopener" target="_blank"><img width="150" height="150" src="doc/images/logo-transparent-nomargin.svg" alt="Sixui logo"></a>
</p>

<h1 align="center">Sixui</h1>

<p align="center">
Ready-to-use foundational React components implementing Google's <a href="https://m3.material.io/">Material Design 3</a>.
</p>

<div align="center">

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/sixui/sixui/blob/HEAD/LICENSE)
[![npm latest package](https://img.shields.io/npm/v/@sixui/core/latest.svg)](https://www.npmjs.com/package/@sixui/core)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@sixui/core)](https://bundlephobia.com/package/@sixui/core@latest)

</div>

## Features

- 🎨 **Material Design 3** - Full implementation of Google's latest design system with 110+ components
- 🎭 **Dynamic Theming** - Runtime theme customization with SSR-safe light/dark mode and localStorage persistence
- 🎯 **Type-Safe** - Built with TypeScript for excellent developer experience
- 🎪 **Accessible** - ARIA-compliant components using react-aria primitives
- 📦 **Tree-Shakeable** - Optimized bundle size with ES modules
- 💅 **Vanilla Extract** - Type-safe CSS-in-TypeScript styling

## Installation

```bash
npm install @sixui/core
# or
pnpm add @sixui/core
# or
yarn add @sixui/core
```

## Quick Start

### Basic Usage

```tsx
import { Button, ThemeProvider } from '@sixui/core';
import '@sixui/core/styles.css';

function App() {
  return (
    <ThemeProvider>
      <Button variant="filled">Click me</Button>
    </ThemeProvider>
  );
}
```

### With Color Scheme Persistence (Next.js/SSR)

Sixui provides complete SSR support with no hydration mismatches:

```tsx
// app/layout.tsx
import { ColorSchemeScript, SixuiProvider, sixuiHtmlProps } from '@sixui/core';
import '@sixui/core/styles.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" {...sixuiHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <SixuiProvider enableColorSchemePersistence defaultColorScheme="light">
          {children}
        </SixuiProvider>
      </body>
    </html>
  );
}

// Use the useColorScheme hook anywhere in your app
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

## Documentation

- [Storybook](https://sixui.com) - Interactive component documentation and examples

## Packages

This monorepo contains the following packages:

- **[@sixui/core](packages/core)** - Core components library with 110+ Material Design 3 components
- **[@sixui/react-hook-form](packages/react-hook-form)** - React Hook Form integration for Sixui components
- **@sixui/toolchain** - Build tooling and compilation infrastructure
- **@sixui/eslint-config** - Shared ESLint configuration
- **@sixui/prettier-config** - Shared Prettier configuration
- **@sixui/typescript-config** - Shared TypeScript base configuration

## Development

This project uses pnpm and Nx for monorepo management.

### Prerequisites

- Node.js (latest LTS recommended)
- pnpm >= 10.17

### Setup

```bash
# Install dependencies
pnpm install

# Start Storybook development server
pnpm dev

# Run type checking and linting across all packages
pnpm check:all

# Build all packages
pnpm build
```

### Project Structure

```
sixui/
├── packages/
│   ├── core/              # Main component library (110+ components)
│   ├── react-hook-form/   # React Hook Form bindings
│   ├── toolchain/         # Build tools
│   ├── eslint-config/     # ESLint configuration
│   ├── prettier-config/   # Prettier configuration
│   └── typescript-config/ # TypeScript configuration
└── apps/
    ├── example-nextjs/    # Next.js 15 example with SSR & color scheme persistence
    └── example-vite/      # Vite example app
```

### Key Features

- **110+ Components**: Comprehensive Material Design 3 implementation including Button, TextField, Dialog, Snackbar, DataTable, and more
- **Custom Hooks**:
  - Theme & color scheme: `useColorScheme`, `useTheme`, `useOsColorScheme`
  - Browser APIs: `useMediaQuery`, `useIntersection`, `useElementSize`
  - Storage: `useLocalStorage` (SSR-safe with cross-tab sync)
  - UI interaction: `useOverlays`, `useDisclosure`, `useSideSheet`, `useRippleEffect`
  - SSR & hydration: `useHydrated`, `useIsMounted`, `useIsomorphicLayoutEffect`
  - Forms: `useCheckbox`, `useRadio`, `useSwitch`, `useSelect`, `useMultiSelect`
- **SSR-Safe Theming**:
  - `ColorSchemeScript` prevents flash of incorrect theme (FOIT)
  - Dual CSS generation eliminates hydration mismatches
  - `sixuiHtmlProps` utility for hydration warning suppression
- **React 19 Support**: Built and tested with latest React version

## Contributing

We welcome contributions! Please see our [development guide](CLAUDE.md) for detailed information about the codebase architecture and development workflow.

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Commits are validated via commitlint.

## License

MIT © [Olivier Pascal](https://github.com/sixui/sixui/blob/HEAD/LICENSE)
