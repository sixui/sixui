import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { stateTokens } from '~/themes/base/state.stylex';
import { focusRingTokens } from '../FocusRing/FocusRing.stylex';

export const visualStateStyles = stylex.create({
  // host: {
  //   alignItems: 'center',
  //   position: 'relative',
  //   boxSizing: 'content-box',
  //   padding: spacingTokens.padding$4,
  //   minHeight: `calc(96px * ${scaleTokens.scale})`,
  //   minWidth: `calc(96px * ${scaleTokens.scale})`,
  //   outlineWidth: outlineTokens.width$xs,
  //   outlineColor: colorSchemeTokens.outline,
  //   borderRadius: shapeTokens.corner$xl,
  //   outlineStyle: 'solid',
  //   color: colorSchemeTokens.onSurface,
  //   justifyContent: 'center',
  // },
  // states: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  // },
  // on: {
  //   color: colorSchemeTokens.primary,
  // },
  // off: {
  //   color: colorSchemeTokens.onSurface,
  //   opacity: stateTokens.opacity$disabled,
  // },
});

export const visualStateFocusRingStyles = stylex.create({
  // host: {
  //   [focusRingTokens.shape]: shapeTokens.corner$xl,
  // },
});
