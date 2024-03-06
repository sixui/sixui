# TO DO

- Skeleton version of components

- faire les stories de dialog
  Refactoring:

  1. suprimer `prop.theme`
  2. use `forwardRref`
  3. extract props from arguments
  4. delete `props.*` and `other.*`
  5. extract `stylesCombinator` from `styleProps` in components
  6. delete unused `visualState` (if not interactive component) or use new `useVisualState`

- tests with polymorphic
- ButtonBase styles in ButtonBase, not in Button?
- styleProps: take only arguments, not array
- refactor how styles are structured (can only theme color roles and palette?)
- story for buttonbase
- stories for visualstate
- faire un code reproductible pour https://github.com/facebook/stylex/issues/478

- FIXME: vite does not refresh when modifying .stylex.ts files
- stories pour ComponentShowcase

- use common styles utilities
- Placeholder -> Skeleton

- Doc

  - [GitBook](https://www.gitbook.com/)

- CONTRIBUTING.md

- Thumb: like avatar but square and no fallback

- CI

  - check if .js and .d.ts has been correctly generated in /dist
  - standardize git commit messages using Husky
  - FIXME: when minor updates, the minor version is updated in package.json but on nomjs it's marked as major update

- SSR

  - Check compatibility with react server components

- Tools

  - Generate colors
    - https://github.com/material-foundation/material-color-utilities
    - https://m3.material.io/styles/color/system/how-the-system-works

- All components

  - Handle routing and default props
    - https://mui.com/material-ui/integrations/routing/
  - Be able to customize:
    - shadowColor
    - stateLayerColor$focus
    - stateLayerColor$dragged
  - Prepend "use-client" directive (o components/hooks) exported from core librairies + add docs and examples for using MUI libraries with Next.js App Router
    - https://github.com/mui/material-ui/pull/37656

- Paper

  - Elevated

- Card

  - Derivate from Paper
  - Video Media
  - Loading state
  - Color
  - Title: truncate on x lines
  - Better disabled state for content

- CardMedia

  - Support video

- New components

  - Phone number?

- Avatar

  - Support SSR like the MUI version

- TextField

  - attrs: id, autocapitalize
  - password: eye button to show/hide password
  - story demo form: delay on submit

- CheckBox

  - hover effect?

- Badge

  - Text is not perfecetly aligned inside

- Chip

  - Animate width change on switching between selected and unselected states
  - Add a minimum delay betweel showing the circular disabled state and progress indicator. First, to avoid showing it for a very short time, but also to have time to show the ripple effect, and to avoid a glitch when the disabled state has a different elevation than the enabled state.

- ListItem

  - Navigate with arrow keys

- Elevation

  - Use visualState instead of relying on state vars

- Tab

  - Navigate with arrow keys
    https://m3.material.io/components/tabs/accessibility
  - Scrollable
  - Vertical
  - Navigable with links
  - Icon position
  - Should we export TabContext?
  - Test with reduced motion

- StateLayer

  - FIXME: no ripple effect on keyboard validation?

- Build

  - Separate the core and the Storybook app
  - Use PostCSS Autoprefixr plugin on the generated CSS file
    https://github.com/facebook/stylex/discussions/223

- ButtonBase

  - Example in stories
  - If this is an anchor link, text-decoration should be none?
  - FIXME: on space key hit, should prevent default to not scroll the page

- Stories

  - Add examples for customized components

- IconButton

  - Controlled/uncontrolled modes (if selectable)

- CI

  - use guards for branch names and commit messages

## Refactoring

- 'component'?: React.ReactNode' property -> 'as'
- Field
  - error boolean -> hasError, ou:
  - suppimer error au profit de errorText
- Use useHover hook?
  - https://react-spectrum.adobe.com/blog/building-a-button-part-2.html
- Chip/Fab/IconButton/ListItem inherit from ButtonBase
- Use hooks like useButton, useTab, useTabs, ... like mui or adobe
- Use React.forwardRef & React.useImperativeHandle?, like in RadioGroup?
- Remove 'borderStyle': 'solid' (handled by reset css)?
- List -> Stack
- use slots and slotProps
  - https://mui.com/base-ui/getting-started/usage/#slots
- Helper to merge styles:

```tsx
<X
  elevationStyles={[
    theme.elevationStyles,
    variantTheme.elevationStyles,
    ...asArray(props.elevationStyles),
  ]}
/>

// to:

<X elevationStyles={combineStyles('elevationStyles')} />
```

## FIX ME

- Check why sx property cannot take undefined or boolean values
- Button / Chip / Fab / ...
  - Adapt attributes if that's a button or a link (ie. type is just for buttons)
- Chromatic
  - Radio not selectable/tabbable with keyboard
  - Custom themes not applied (ie. Checkbox/Custom story)
    to fix, do not define themes in stylex.ts (only vars), but define themes in styles.ts
    the problem is that by defining the theme in styles.ts, dark color scheme is not applied
    find another solution
    - https://github.com/facebook/stylex/issues/162
    - https://github.com/facebook/stylex/issues/281

## Waiting for a fix

- [stylex] "All variables in a variable group must be overridden when creating a theme."
  - https://github.com/facebook/stylex/issues/188#issuecomment-1857661215
  - remove in \*.styles.ts types like `Partial<IStyleVars<I...StyleVarKey>>` and `vars as IStyleVars<I..StyleVarKey>`
- [stylex] @stylexjs/eslint-plugin: 'Computed key cannot be resolved' when overwriting var
  - https://github.com/facebook/stylex/issues/337
  - remove `// eslint-disable-next-line @stylexjs/valid-styles`
- [Storybook] Infinite loop with array of objects in args
  - https://github.com/storybookjs/storybook/issues/17098#issuecomment-1049679681
  - https://github.com/storybookjs/storybook/issues/17482
- [webpack] Improving the Webpack plugin
  - https://github.com/facebook/stylex/issues/297
  - https://github.com/facebook/stylex/issues/288
- [@stylexjs/eslint-plugin] "@stylexjs/sort-keys" severity invalid
  - https://github.com/facebook/stylex/issues/414
  - Then, replace 1 by 'warning' in .eslintrc.cjs
- [@stylexjs/eslint-plugin] autofix
  - https://github.com/facebook/stylex/issues/415
  - Then, enable rule in .eslintrc.cjs

## Check

- implémenter https://react-spectrum.adobe.com/react-stately/index.html ?
- abstract pattern for components Buttons, Chips, ProgressIndicators, ...
  https://javascript.plainenglish.io/react-abstract-design-pattern-dry-single-shared-responsibility-part-1-c63dfac5eb8c

## Roadmap

### In progress

_What that the team is currently working on._

Components

- [ ] AvatarGroup
- [ ] App Bar
- [ ] Grid
- [ ] Tooltip
- [ ] Stack
- [ ] Pagination
- [ ] CardActionArea
- [ ] CardActions
- [ ] CardContent
- [ ] CardHeader
- [ ] CardMedia
- [ ] Select

### Planned

_What that the team is planning to work on after the current goal._

Features

- [ ] Docs and examples

Components

- [ ] Backdrop
- [ ] Box
- [ ] Container
- [ ] Dialog
- [ ] Drawer
- [ ] Image List
- [ ] Linear Progress Indicator
- [ ] Loading Progress Bar
- [ ] Password Strength Meter
- [ ] Slider
- [ ] Snackbar
- [ ] Skeleton
- [ ] Stepper
- [ ] Treeview

### Future

_What is not yet organized into a planned goal._

Features

- [ ] Spacing tokens
- [ ] Density
- [ ] SSR
- [ ] Support more screen readers
- [ ] Prevent event default behavior
- [ ] Size tracking

Components

- [ ] Autocomplete
- [ ] Banner
- [ ] Bottom sheet
- [ ] Data table
- [ ] Date picker
- [ ] Menu
- [ ] Navigation bar
- [ ] Navigation drawer
- [ ] Navigation rail
- [ ] Search
- [ ] Segmented button
- [ ] Snackbar
- [ ] Time picker
- [ ] Tooltip

Check:
https://mui.com/material-ui/all-components/

### Not planned

_What the team has decided not to work on._

Components

- [ ] Bottom app bar
- [ ] Top app bar

## Follow

- mui: Adopt Material Design 3 / Material You
  - https://github.com/mui/material-ui/issues/29345
- mui: [RFC][system] Zero-runtime CSS-in-JS implementation #38137
  - https://github.com/mui/material-ui/issues/38137
