import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { typescaleTokens } from '@/themes/base/tokens/typo.stylex';
import { stateTokens } from '@/themes/base/tokens/state.stylex';
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
  },
  host$md: {
    width: circularProgressIndicatorTokens.size$md,
    height: circularProgressIndicatorTokens.size$md,
  },
  host$lg: {
    width: circularProgressIndicatorTokens.size$lg,
    height: circularProgressIndicatorTokens.size$lg,
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
  },
  progress$md: {
    margin: circularProgressIndicatorTokens.containerPadding$md,
  },
  progress$lg: {
    margin: circularProgressIndicatorTokens.containerPadding$lg,
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    color: colorRolesTokens.onSurface,
    fontFamily: typescaleTokens.labelFont$sm,
    fontSize: typescaleTokens.labelSize$sm,
    fontWeight: typescaleTokens.labelWeight$sm,
    lineHeight: typescaleTokens.labelLineHeight$sm,
    letterSpacing: typescaleTokens.labelLetterSpacing$sm,
  },
  label$disabled: {
    opacity: stateTokens.opacity$disabled,
  },
});
