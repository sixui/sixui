import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { stateTokens } from '@/themes/base/state.stylex';
import { iconButtonTokens } from '../IconButton.stylex';

export const outlinedIconButtonStyles = stylex.create({
  host: {
    [iconButtonTokens.selectedContainerColor]: colorSchemeTokens.inverseSurface,

    [iconButtonTokens.iconColor]: colorSchemeTokens.onSurfaceVariant,
    [iconButtonTokens.iconColor$focus]: colorSchemeTokens.onSurfaceVariant,
    [iconButtonTokens.iconColor$hover]: colorSchemeTokens.onSurfaceVariant,
    [iconButtonTokens.iconColor$pressed]: colorSchemeTokens.onSurfaceVariant,
    [iconButtonTokens.iconColor$disabled]: colorSchemeTokens.onSurfaceVariant,

    [iconButtonTokens.toggleIconColor]: colorSchemeTokens.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$focus]:
      colorSchemeTokens.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$hover]:
      colorSchemeTokens.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$pressed]:
      colorSchemeTokens.onSurfaceVariant,

    [iconButtonTokens.toggleSelectedIconColor]:
      colorSchemeTokens.inverseOnSurface,
    [iconButtonTokens.toggleSelectedIconColor$focus]:
      colorSchemeTokens.inverseOnSurface,
    [iconButtonTokens.toggleSelectedIconColor$hover]:
      colorSchemeTokens.inverseOnSurface,
    [iconButtonTokens.toggleSelectedIconColor$pressed]:
      colorSchemeTokens.inverseOnSurface,

    [iconButtonTokens.stateLayerColor$hover]:
      colorSchemeTokens.onSurfaceVariant,
    [iconButtonTokens.stateLayerColor$pressed]:
      colorSchemeTokens.onSurfaceVariant,

    [iconButtonTokens.toggleStateLayerColor$hover]:
      colorSchemeTokens.onSurfaceVariant,
    [iconButtonTokens.toggleStateLayerColor$pressed]:
      colorSchemeTokens.onSurfaceVariant,

    [iconButtonTokens.toggleSelectedStateLayerColor$hover]:
      colorSchemeTokens.inverseOnSurface,
    [iconButtonTokens.toggleSelectedStateLayerColor$pressed]:
      colorSchemeTokens.inverseOnSurface,

    [iconButtonTokens.outlineStyle]: 'solid',
    [iconButtonTokens.outlineWidth]: '1px',
    [iconButtonTokens.outlineColor]: colorSchemeTokens.outline,
    [iconButtonTokens.outlineColor$disabled]: colorSchemeTokens.onSurface,
    [iconButtonTokens.outlineOpacity$disabled]:
      stateTokens.outlineOpacity$disabled,
    [iconButtonTokens.outlineColor$focus]: colorSchemeTokens.outline,
    [iconButtonTokens.outlineColor$pressed]: colorSchemeTokens.outline,
  },
});
