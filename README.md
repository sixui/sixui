# sixui/ui &middot; [![npm bundle size](https://img.shields.io/bundlephobia/minzip/@sixui/ui)](https://bundlephobia.com/package/@sixui/ui@latest)

Ready-to-use foundational React components.

- Implements Google's [Material Design 3](https://m3.material.io/).
- Leverages Meta's [StyleX](https://github.com/facebook/stylex/) for near zero-runtime styling.
- Fully themable through CSS styles or CSS vars.
- Type-safe APIs, styles and themes.
- Deploys on [Chromatic](https://65b3729830a9a664ba7336f5-mgbxgkdzhu.chromatic.com/).

## Prepare

```sh
$ nvm use 18
$ yarn set version 4.1.0
$ yarn install
```

## Run for local development

```sh
$ yarn dev
```

Open Storybook at http://localhost:6006.

## Default Color Scheme

![Default Color Scheme](doc/images/color-scheme.png)

## Completed components

Features

- [x] Catalog
- [x] Color theming
- [x] Typography theming
- [x] Motion theming
- [x] Shape theming
- [x] Typescript-based theming

Components

- [x] Avatar

![Avatar](doc/images/avatar.png)

- [x] Badge

![Badge](doc/images/badge.png)

- [x] Breadcrumbs
- [x] Button

![Button](doc/images/button.png)

- [x] Button Base
- [x] Card

![HorizontalCard](doc/images/card-horizontal.png)
![VerticalCard](doc/images/card-vertical.png)

- [x] Checkbox

![Checkbox](doc/images/checkbox.png)

- [x] Chip

![Chip](doc/images/chip.png)

- [x] Circular Progress Indicator

![CircularProgressIndicator](doc/images/determinate-circular-indicator.png)
![CircularProgressIndicator with label](doc/images/determinate-circular-indicator-with-label.png)

- [x] Combobox

![Combobox](doc/images/combobox.png)
![MultiCombobox](doc/images/multi-combobox.png)

- [x] Dialog
- [x] Disclosure

![Disclosure](doc/images/disclosure.png)

- [x] Divider
- [x] ElementWithLabel
- [x] FAB

![FAB](doc/images/fab.png)

- [x] Field
- [x] Field Base
- [x] Icon Button

![IconButton](doc/images/icon-button.png)

- [x] Item
- [x] List
- [x] ListItem
- [x] Menu

![Menu](doc/images/menu.png)

- [x] MenuList

![MenuList](doc/images/menu-list.png)

- [x] Paper
- [x] Placeholder
- [x] Radio

![Radio](doc/images/radio.png)

- [x] Scrim
- [x] Select

![Select](doc/images/select.png)
![MultiSelect](doc/images/multi-select.png)

- [x] Skeleton

![Skeleton](doc/images/skeleton.png)

- [x] Stepper

![HorizontalStepper](doc/images/horizontal-stepper.png)
![VerticalStepper](doc/images/vertical-stepper.png)

- [x] Switch

![Switch](doc/images/switch.png)

- [x] Tab
- [x] TabList
- [x] TabPanel
- [x] Tabs

![PrimaryTabs](doc/images/primary-tabs.png)
![SecondaryTabs](doc/images/secondary-tabs.png)

- [x] Text Field

![TextField](doc/images/text-field.png)

- [x] Typography

Utils

- [x] Anchored

![Anchored](doc/images/anchored.png)

- [x] Component Showcase

![ComponentShowcase](doc/images/component-showcase.png)

- [x] Elevation

![Elevation](doc/images/elevation.png)

- [x] Focus Ring

![FocusRing](doc/images/focus-ring.png)

- [x] Form
- [x] State Layer
- [x] Visual State
- [x] Fade

## Workflow

Create a new branch.

```sh
$ git checkout -b button-color
```

Edit code, ie. `src/components/atoms/Button/Button.tsx`, then commit changes.

```sh
$ git add .
$ git commit -m "Button has a new color."
$ git push -u origin button-color
```

Open a pull request for the `button-color` branch (via GitHub.com or a VSCode plugin). Once opened, the CI job to publish Storybook will run.

If needed, in the list of PR checks at the bottom of the page, click `Storybook Publish` to view the published Storybook with the new changes and review it.

Now merge the PR, navigate to the package on npm, and hang tight for a few minutes while the package is updated.

Checkout main and delete the merged branch.

```sh
$ git checkout main
$ git pull
$ git branch -d button-color
```

## Commit skipping CI

```sh
$ git commit -m "My commit message [skip ci]"
```

## Update Node.js modules

```sh
$ npx npm-check-updates -i
```

## Importing @sixui/ui as a third-party module

### Setup

```sh
$ nvm use 18
$ yarn set version stable
$ yarn add @sixui/ui
```

#### Yarn

```yml
# .yarnrc.yml

# ...
nodeLinker: node-modules
```

```sh
$ yarn install
```

#### StyleX

See https://stylexjs.com/docs/learn/installation/.

### Usage

```tsx
// BasicExample.tsx

'use client';

import { ThemeProvider, baseTheme, FilledTextField } from '@sixui/ui';

const BasicExample: React.FC = () => (
  <ThemeProvider value={{ theme: baseTheme }}>
    <FilledTextField label='Label' />
  </ThemeProvider>
);

export default BasicExample;
```

```tsx
// ThemingExample.tsx

'use client';

import stylex from '@stylexjs/stylex';

import {
  ThemeProvider,
  baseTheme,
  variantTheme,
  FilledButton,
} from '@sixui/ui';
import { componentVars as buttonComponentVars } from '@sixui/ui/themes/base/Button/Button.stylex';
import { componentTheme as buttonVariantTheme } from '@sixui/ui/themes/variant/Button/FilledButton.stylex';
import { colorPaletteTheme } from '@sixui/ui/themes/variant/vars/colorPalettes.stylex';
import {
  colorRolesTheme,
  colorRolesVars,
} from '@sixui/ui/themes/base/vars/colorRoles.stylex';
import { typescaleVars } from '@sixui/ui/themes/base/vars/typo.stylex';

const layoutStyles = stylex.create({
  host: {
    display: 'flex',
    padding: '1rem',
    gap: '1rem',
    alignItems: 'center',
  },
  legend: {
    width: '100px',
    fontFamily: typescaleVars.labelFont$lg,
    fontSize: typescaleVars.labelSize$md,
    fontWeight: typescaleVars.labelWeight$md,
    lineHeight: typescaleVars.labelLineHeight$md,
    letterSpacing: typescaleVars.labelTracking$md,
    color: colorRolesVars.onSurface,
    opacity: '0.5',
    display: 'flex',
    padding: '1rem',
    justifyContent: 'flex-end',
  },
});

const buttonStyles = stylex.create({
  host: {
    [buttonComponentVars.labelTextSize]: '1.2rem',
  },
  label: {
    textTransform: 'uppercase',
  },
});

const ThemingExample: React.FC = () => (
  <>
    <ThemeProvider value={{ theme: baseTheme }}>
      <div {...stylex.props(layoutStyles.host)}>
        <div {...stylex.props(layoutStyles.legend)}>Base theme</div>
        <FilledButton>Default</FilledButton>
        <FilledButton styles={buttonStyles}>Styled</FilledButton>
        <FilledButton theme={buttonVariantTheme}>Locally themed</FilledButton>
      </div>
    </ThemeProvider>

    <ThemeProvider value={{ theme: variantTheme }}>
      <div
        {...stylex.props(layoutStyles.host, colorPaletteTheme, colorRolesTheme)}
      >
        <div {...stylex.props(layoutStyles.legend)}>Variant theme</div>
        <FilledButton>Default</FilledButton>
        <FilledButton styles={buttonStyles}>Styled</FilledButton>
        <FilledButton theme={buttonVariantTheme}>Locally themed</FilledButton>
      </div>
    </ThemeProvider>
  </>
);

export default ThemingExample;
```

#### Notes with Next.js

```js
// next.config.js

const withStylex = require('@stylexjs/nextjs-plugin');
const babelrc = require('./.babelrc.js');
const plugins = babelrc.plugins;
const [_name, options] = plugins.find(
  (plugin) => Array.isArray(plugin) && plugin[0] === '@stylexjs/babel-plugin',
);
const rootDir = options.unstable_moduleResolution.rootDir ?? __dirname;

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@sixui/ui'],
};

module.exports = withStylex({
  rootDir,
  useCSSLayers: true,
})(nextConfig);
```

```tsx
// src/app/layout.tsx

import '@sixui/ui/styles.css';

// ...
```

#### Notes with Vite

```sh
$ yarn add vite-plugin-stylex --dev
```

```js
// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import styleX from 'vite-plugin-stylex';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), styleX()],
  optimizeDeps: {
    exclude: ['@sixui/ui'],
  },
});
```

```tsx
// src/main.tsx

import '@sixui/ui/styles.css';

// ...
```

#### Notes with `react-router-dom`

```tsx
import { forwardRef } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { FilledButton } from '@sixui/ui';

export const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>(function LinkBehavior(props, ref) {
  const { href, ...other } = props;

  // Map href (sixui) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

export const Usage: React.FC = () => (
  <FilledButton component={LinkBehavior} href='/login'>
    Login
  </FilledButton>
);
```

### Setup Storybook (optional)

```sh
$ npx storybook@latest init
```

```js
// .storybook/main.js

// (...)
export default {
  // (...)
  refs: {
    'design-system': {
      title: 'sixui',
      url: 'https://654a07f6d5de71f31c8d0568-ncheukrqdk.chromatic.com',
    },
  },
};

export default config;
```

### Tokens (.env)

Used to run `yarn release` locally.

#### GITHUB_TOKEN

Create a [fine-grained token](https://github.com/settings/tokens?type=beta) on GitHub with the following scopes:

- Repository access
  - sixui/ui
- Repository permissions
  - repo:issues (rw)
  - repo:workflow (rw)
  - repo:contents (rw)
  - repo:pull-requests (r)

### NPM_TOKEN

Used to run `yarn release` locally.

Create a [granular access token](https://www.npmjs.com/settings/olivierpascal/tokens) on npmjs with the following scopes:

- Packages and scopes
  - @sixui: read/write

## Troubleshooting

> Error: Working directory is not clean, make sure all files are committed

Make sure that `package.json` ends with a newline.
