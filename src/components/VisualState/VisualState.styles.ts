import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { focusRingTokens } from '~/components/FocusRing/FocusRing.stylex';
import { stateTokens } from '~/themes/base/state.stylex';

export const visualStateStyles = stylex.create({
  host: {
    position: 'relative',
    boxSizing: 'content-box',
    padding: '1rem',
    minHeight: 96,
    minWidth: 96,
    outlineWidth: '1px',
    outlineColor: colorSchemeTokens.outline,
    borderRadius: shapeTokens.corner$xl,
    outlineStyle: 'solid',
    color: colorSchemeTokens.onSurface,
    justifyContent: 'center',
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    alignItems: 'center',
  },
  states: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  on: {
    color: colorSchemeTokens.primary,
  },
  off: {
    color: colorSchemeTokens.onSurface,
    opacity: stateTokens.opacity$disabled,
  },
});

export const visualStateFocusRingStyles = stylex.create({
  host: {
    [focusRingTokens.shape]: shapeTokens.corner$xl,
  },
});
