# TO DO

- Generate colors from
  https://github.com/material-foundation/material-color-utilities
  https://m3.material.io/styles/color/system/how-the-system-works
- check react server components

- be able to customize:
  - shadowColor
  - stateLayerColor$focus
  - stateLayerColor$dragged

- don't include .storybook/ in the final package
- check if tree shaking is working

- use React.forwardRef & React.useImperativeHandle?
- Prepend "use-client" directive (o components/hooks) exported from core librairies + add docs and examples for using MUI libraries with Next.js App Router
  see https://github.com/mui/material-ui/pull/37656
- change __LIBNAME by the real definitive lib name

- Chip
  - animate width change on select / unselect
  - délai minimum avant d'afficher le loading indicator. d'abord pour ne pas afficher d'animation super rapide, mais aussi pour avoir le temps d'afficher le ripple effect
- ListItem
  - switch elements with up and down keys
- Elevation
  use visualState?

- Separate the core and the Storybook app.
- check monorepo usage
- remove heroicicons dependency
- remove lodash dependency

## FIX ME

- Button / Chip / Fab / ... : adapt attributes if that's a button or a link (ie. type is just for buttons)
- DeterminateCircularProgressIndicator does not work
- "The CJS build of Vite's Node API is deprecated. See https://vitejs.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated for more details."
- Firefox: remove dotted outline on focus elements
- icons not displayed in Chromatic
- radio not selectable/tabbable with keyboard

## Waiting for a fix

- [stylex] 0.4.1: The inferred type of this node exceeds the maximum length the compiler will serialize.
  https://github.com/facebook/stylex/issues/336
  - remove unecessary types in `stylex.create<>()` calls
- [stylex] "All variables in a variable group must be overridden when creating a theme."
  https://github.com/facebook/stylex/issues/188#issuecomment-1857661215
  - remove in *.styles.ts types like `Partial<IStyleVars<I...StyleVarKey>>` and `vars as IStyleVars<I..StyleVarKey>`
- [stylex] @stylexjs/eslint-plugin: 'Computed key cannot be resolved' when overwriting var
  https://github.com/facebook/stylex/issues/337
  - remove `// eslint-disable-next-line @stylexjs/valid-styles`
- [stylex] Since 0.4.1: Uncaught TypeError: stylex.inject is not a function
  https://github.com/HorusGoul/vite-plugin-stylex/issues/29
  - remove `resolutions` in `package.json`
- [stylex] The return value of stylex.defineVars() must be bound to a named export
  When building es module, rollup does not preserve exported value immediately upon declaration like export const varA = 42;. Instead, rollup systematically group exports to const varA = 42; export { varA };. And this behavior is not compatible with stylex. See:
  https://github.com/facebook/stylex/issues/348
  https://github.com/rollup/rollup/discussions/5339#discussioncomment-8121884
- [stylex] CSS expressions are modified and become invalid during compilation
  https://github.com/facebook/stylex/issues/351
- [Storybook] Infinite loop with array of objects in args
  https://github.com/storybookjs/storybook/issues/17098#issuecomment-1049679681
  https://github.com/storybookjs/storybook/issues/17482
- [stylex] 0.4.1: stylex.inject is not a function
  https://github.com/facebook/stylex/issues/334
- [nextjs] inject is not defined when using an external lib
  https://github.com/facebook/stylex/issues/375
  Then, add again `"type": "module"` in `package.json`.
- [webpack] Improving the Webpack plugin
  https://github.com/facebook/stylex/issues/297
  https://github.com/facebook/stylex/issues/288

## Refactoring

- use postcss Autoprefixr on the generated CSS file
- remove 'px' from css attributes values?
- use `const { current: xxx } = React.useRef();` instead of `const xxxRef = React.useRef(); const xxx = xxxRef.current;` (use `useForkRef` and `setRef`)
- do not export vars from theme (as they should not be used directly, but from *.stylex.ts)
- use useHover hook?
  https://react-spectrum.adobe.com/blog/building-a-button-part-2.html

## Check

- implémenter https://react-spectrum.adobe.com/react-stately/index.html ?
- abstract pattern for components Buttons, Chips, ProgressIndicators, ...
  https://javascript.plainenglish.io/react-abstract-design-pattern-dry-single-shared-responsibility-part-1-c63dfac5eb8c

## Roadmap

### In progress

*What that the team is currently working on.*

Components
  [ ] Select
  [ ] CardActionArea
  [ ] CardActions
  [ ] CardContent
  [ ] CardHeader
  [ ] CardMedia

### Planned

*What that the team is planning to work on after the current goal.*

Features
  [ ] Docs and examples

Components
  [ ] Dialog
  [ ] Linear Progress Indicator
  [ ] Slider

### Future

*What is not yet organized into a planned goal.*

Features
  [ ] Spacing tokens
  [ ] Density
  [ ] SSR
  [ ] Support more screen readers
  [ ] Prevent event default behavior
  [ ] Size tracking

Components
  [ ] Autocomplete
  [ ] Badge
  [ ] Banner
  [ ] Bottom sheet
  [ ] Data table
  [ ] Date picker
  [ ] Menu
  [ ] Navigation bar
  [ ] Navigation drawer
  [ ] Navigation rail
  [ ] Search
  [ ] Segmented button
  [ ] Snackbar
  [ ] Tabs
  [ ] Time picker
  [ ] Tooltip

Check:
  https://mui.com/material-ui/all-components/

### Complete

*Completed goals and releases.*

Features
  [x] Catalog
  [x] Color theming
  [x] Typography theming
  [x] Motion theming
  [x] Shape theming
  [x] Typescript-based theming
  [x] Catalog

Components
  [x] Button
  [x] Card
  [x] Checkbox
  [x] Chip
  [x] Circular Progress Indicator
  [x] Divider
  [x] Elevation
  [x] FAB
  [x] Field
  [x] Focus ring
  [x] Icon
  [x] IconButton
  [x] Item
  [x] List
  [x] Radio
  [x] Ripple
  [x] Switch
  [x] Text field

### Not planned

*What the team has decided not to work on.*

Components
  [ ] Bottom app bar
  [ ] Top app bar

## Follow

- mui: Adopt Material Design 3 / Material You
  https://github.com/mui/material-ui/issues/29345
- mui: [RFC][system] Zero-runtime CSS-in-JS implementation #38137
  https://github.com/mui/material-ui/issues/38137

