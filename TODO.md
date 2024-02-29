# TO DO

- FIXME: vite does not refresh when modifying .stylex.ts files

- Placeholder -> Skeleton

- Doc

  - [GitBook](https://www.gitbook.com/)

- CONTRIBUTING.md

- Thumb: like avatar but square and no fallback
- Do not export variant theme

- Icons

  - support any icon (JSX.Element?)

- CI

  - check if .js and .d.ts has been correctly generated in /dist
  - standardize git commit messages using Husky
  - FIXME: when minor updates, the minor version is updated in package.json but on nomjs it's marked as major update

- ESLint

  - add eslint-plugin-fp

- SSR

  - Check compatibility with react server components

- Tools

  - Generate colors
    - https://github.com/material-foundation/material-color-utilities
    - https://m3.material.io/styles/color/system/how-the-system-works

- All components

  - Handle routing and default props
    - https://mui.com/material-ui/integrations/routing/
  - Add hostStyles (or sx) property
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
  - Disabled state
  - Video Media
  - Loading state
  - Color
  - Title: truncate on x lines

- CardMedia

  - Support video

- New components

  - Phone number

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

- Breadcrumbs

  - Be able to show the last separator

- Chip

  - Animate width change on switching between selected and unselected states
  - Add a minimum delay betweel showing the circular progress indicator. First, to avoid showing it for a very short time, but also to have time to show the ripple effect.

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
  - Badges
  - Test with reduced motion

- Ripple

  - FIXME: no ripple effect on keyboard validation?

- Build

  - Separate the core and the Storybook app
  - Use PostCSS Autoprefixr plugin on the generated CSS file
    https://github.com/facebook/stylex/discussions/223
  - Do not include .storybook/ in the final package
  - Check if tree shaking is working

- ButtonBase

  - Example in stories
  - If this is an anchor link, text-decoration should be none?
  - FIXME: on space key hit, should prevent default to not scroll the page

- Button

  - Icon should be anything, not only a svg component

- Stories

  - Add examples for customized components

- IconButton

  - Controlled/uncontrolled modes (if selectable)

- CircularProgressIndicator
  - Use component showcase

## Refactoring

- Field
  - error boolean -> hasError, ou:
  - suppimer error au profit de errorText
- Prefer types over interfaces
- Use useHover hook?
  - https://react-spectrum.adobe.com/blog/building-a-button-part-2.html
- Chip/Fab/IconButton/ListItem inherit from ButtonBase
- Use hooks like useButton, useTab, useTabs, ... like mui or adobe
- Use React.forwardRef & React.useImperativeHandle?
- Remove 'borderStyle': 'solid' (handled by reset css)?
- List -> Stack
- All stylePropsFactory() must use props.visualState
- use slots and slotProps
  - https://mui.com/base-ui/getting-started/usage/#slots
- IContainer -> IContainerProps (dans helpers -> utils)
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

- eslint rule:

```js
'no-restricted-imports': [
  'error',
  {
    paths: [
      {
        name: 'react',
        importNames: ['default'],
        message: 'Please use named imports instead.',
      },
    ],
  },
],
```

- enable `"noUnusedLocals": true,` in `tsconfig.json`

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

- [stylex] 0.4.1: The inferred type of this node exceeds the maximum length the compiler will serialize.
  - https://github.com/facebook/stylex/issues/336
  - remove unecessary types in `stylex.create<>()` calls
- [stylex] "All variables in a variable group must be overridden when creating a theme."
  - https://github.com/facebook/stylex/issues/188#issuecomment-1857661215
  - remove in \*.styles.ts types like `Partial<IStyleVars<I...StyleVarKey>>` and `vars as IStyleVars<I..StyleVarKey>`
- [stylex] @stylexjs/eslint-plugin: 'Computed key cannot be resolved' when overwriting var
  - https://github.com/facebook/stylex/issues/337
  - remove `// eslint-disable-next-line @stylexjs/valid-styles`
- [stylex] Since 0.4.1: Uncaught TypeError: stylex.inject is not a function
  - https://github.com/HorusGoul/vite-plugin-stylex/issues/29
  - remove `resolutions` in `package.json`
- [stylex] The return value of stylex.defineVars() must be bound to a named export
  When building es module, rollup does not preserve exported value immediately upon declaration like export const varA = 42;. Instead, rollup systematically group exports to const varA = 42; export { varA };. And this behavior is not compatible with stylex. See:
  - https://github.com/facebook/stylex/issues/348
  - https://github.com/rollup/rollup/discussions/5339#discussioncomment-8121884
- [stylex] CSS expressions are modified and become invalid during compilation
  - https://github.com/facebook/stylex/issues/351
- [Storybook] Infinite loop with array of objects in args
  - https://github.com/storybookjs/storybook/issues/17098#issuecomment-1049679681
  - https://github.com/storybookjs/storybook/issues/17482
- [stylex] 0.4.1: stylex.inject is not a function
  - https://github.com/facebook/stylex/issues/334
- [nextjs] inject is not defined when using an external lib
  - https://github.com/facebook/stylex/issues/375
  - Then, add again `"type": "module"` in `package.json`.
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
