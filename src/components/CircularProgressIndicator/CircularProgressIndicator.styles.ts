import stylex from '@stylexjs/stylex';

import { circularProgressIndicatorTokens } from './CircularProgressIndicator.stylex';

// https://github.com/material-components/material-web/blob/main/progress/internal/_circulardeterminate-progress.scss

export type ICircularProgressIndicatorStylesKey =
  keyof typeof circularProgressIndicatorStyles;
export const circularProgressIndicatorStyles = stylex.create({
  host: {
    display: 'inline-flex',
    verticalAlign: 'middle',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',

    // `contain` and `content-visibility` are performance optimizations
    // important here because progress indicators are often used when a cpu
    // intensive task is underway so it's especially important to minimize
    // their cpu consumption.
    contain: 'strict',
    contentVisibility: 'auto',

    width: circularProgressIndicatorTokens.size,
    height: circularProgressIndicatorTokens.size,
  },
  layer: {
    position: 'absolute',
    inset: 0,
    borderColor: 'inherit',
  },
  progress: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    alignSelf: 'stretch',

    margin: circularProgressIndicatorTokens.containerPadding,
  },
});
