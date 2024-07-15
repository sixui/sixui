import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { elevationTokens } from '@/components/Elevation/Elevation.stylex';
import { cardTokens } from '../Card.stylex';

// https://github.com/material-components/material-web/blob/main/labs/card/internal/_outlined-card.scss

export const outlinedCardStyles = stylex.create({
  host: {
    [cardTokens.containerColor]: colorRolesTokens.surface,
    [cardTokens.containerElevation]: elevationTokens.boxShadow$level0,
    [cardTokens.containerColor$disabled]:
      colorRolesTokens.surfaceContainerHighest,
    [cardTokens.containerElevation$disabled]: elevationTokens.boxShadow$level0,
    [cardTokens.containerElevation$focus]: elevationTokens.boxShadow$level0,
    [cardTokens.containerElevation$hover]: elevationTokens.boxShadow$level0,
    [cardTokens.containerElevation$pressed]: elevationTokens.boxShadow$level0,
    [cardTokens.containerElevation$dragged]: elevationTokens.boxShadow$level3,

    [cardTokens.outlineColor]: colorRolesTokens.outlineVariant,
    [cardTokens.outlineWidth]: '1px',
    [cardTokens.outlineColor$focus]: colorRolesTokens.outlineVariant,
    [cardTokens.outlineColor$hover]: colorRolesTokens.outlineVariant,
    [cardTokens.outlineColor$pressed]: colorRolesTokens.outlineVariant,
    [cardTokens.outlineColor$dragged]: colorRolesTokens.outlineVariant,
    [cardTokens.outlineColor$disabled]: colorRolesTokens.outline,
    [cardTokens.outlineOpacity$disabled]: cardTokens.containerOpacity$disabled,
  },
  outline: {
    inset: 0,
    pointerEvents: 'none',
    borderStyle: 'solid',
    borderWidth: cardTokens.outlineWidth,
    position: 'absolute',
    borderColor: cardTokens.outlineColor,
    borderRadius: 'inherit',
  },
  outline$actionable: {
    borderColor: {
      default: cardTokens.outlineColor,
      ':is([data-focused])': cardTokens.outlineColor$focus,
      ':is([data-hovered])': cardTokens.outlineColor$hover,
      ':is([data-pressed])': cardTokens.outlineColor$pressed,
    },
  },
  outline$disabled: {
    borderColor: cardTokens.outlineColor$disabled,
    opacity: cardTokens.outlineOpacity$disabled,
  },
  outline$dragged: {
    borderColor: cardTokens.outlineColor$dragged,
  },
});
