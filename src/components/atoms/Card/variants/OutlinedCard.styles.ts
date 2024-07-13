import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { componentVars as elevationVars } from '@/themes/base/Elevation/Elevation.stylex';
import { cardTokens } from '../Card.stylex';

// https://github.com/material-components/material-web/blob/main/labs/card/internal/_outlined-card.scss

export const outlinedCardStyles = stylex.create({
  host: {
    [cardTokens.containerColor]: colorRolesVars.surface,
    [cardTokens.containerElevation]: elevationVars.boxShadow$level0,
    [cardTokens.containerColor$disabled]:
      colorRolesVars.surfaceContainerHighest,
    [cardTokens.containerElevation$disabled]: elevationVars.boxShadow$level0,
    [cardTokens.containerElevation$focus]: elevationVars.boxShadow$level0,
    [cardTokens.containerElevation$hover]: elevationVars.boxShadow$level0,
    [cardTokens.containerElevation$pressed]: elevationVars.boxShadow$level0,
    [cardTokens.containerElevation$dragged]: elevationVars.boxShadow$level3,

    [cardTokens.outlineColor]: colorRolesVars.outlineVariant,
    [cardTokens.outlineWidth]: '1px',
    [cardTokens.outlineColor$focus]: colorRolesVars.outlineVariant,
    [cardTokens.outlineColor$hover]: colorRolesVars.outlineVariant,
    [cardTokens.outlineColor$pressed]: colorRolesVars.outlineVariant,
    [cardTokens.outlineColor$dragged]: colorRolesVars.outlineVariant,
    [cardTokens.outlineColor$disabled]: colorRolesVars.outline,
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
