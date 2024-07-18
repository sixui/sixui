import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';
import { focusRingTokens } from '@/components/FocusRing/FocusRing.stylex';
import { stateTokens } from '@/themes/base/state.stylex';

export const visualStateStyles = stylex.create({
  host: {
    position: 'relative',
    boxSizing: 'content-box',
    padding: '1rem',
    minHeight: 96,
    minWidth: 96,
    outlineWidth: '1px',
    outlineColor: colorRolesTokens.outline,
    borderRadius: shapeTokens.corner$xl,
    outlineStyle: 'solid',
    color: colorRolesTokens.onSurface,
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
    color: colorRolesTokens.primary,
  },
  off: {
    color: colorRolesTokens.onSurface,
    opacity: stateTokens.opacity$disabled,
  },
});

export const visualStateFocusRingStyles = stylex.create({
  host: {
    [focusRingTokens.shape]: shapeTokens.corner$xl,
  },
});
