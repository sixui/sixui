import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { elevationTokens } from '../../Elevation/Elevation.stylex';
import { cardTokens } from '../Card.stylex';

// https://github.com/material-components/material-web/blob/main/labs/card/internal/_outlined-card.scss

export const outlinedCardStyles = stylex.create({
  host: {
    [cardTokens.containerColor]: colorSchemeTokens.surface,
    [cardTokens.containerElevation]: elevationTokens.boxShadow$level0,
    [cardTokens.containerColor$disabled]:
      colorSchemeTokens.surfaceContainerHighest,
    [cardTokens.containerElevation$disabled]: elevationTokens.boxShadow$level0,
    [cardTokens.containerElevation$focus]: elevationTokens.boxShadow$level0,
    [cardTokens.containerElevation$hover]: elevationTokens.boxShadow$level0,
    [cardTokens.containerElevation$pressed]: elevationTokens.boxShadow$level0,
    [cardTokens.containerElevation$dragged]: elevationTokens.boxShadow$level3,

    [cardTokens.outlineColor]: colorSchemeTokens.outlineVariant,
    [cardTokens.outlineWidth]: '1px',
    [cardTokens.outlineColor$focus]: colorSchemeTokens.outlineVariant,
    [cardTokens.outlineColor$hover]: colorSchemeTokens.outlineVariant,
    [cardTokens.outlineColor$pressed]: colorSchemeTokens.outlineVariant,
    [cardTokens.outlineColor$dragged]: colorSchemeTokens.outlineVariant,
    [cardTokens.outlineColor$disabled]: colorSchemeTokens.outline,
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
