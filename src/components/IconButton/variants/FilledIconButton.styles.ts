import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { iconButtonTokens } from '../IconButton.stylex';

export const filledIconButtonStyles = stylex.create({
  host: {
    [iconButtonTokens.containerColor]: colorSchemeTokens.primary,
    [iconButtonTokens.containerColor$disabled]: colorSchemeTokens.onSurface,

    [iconButtonTokens.unselectedContainerColor]:
      colorSchemeTokens.surfaceContainerHighest,

    [iconButtonTokens.selectedContainerColor]: colorSchemeTokens.primary,

    [iconButtonTokens.iconColor]: colorSchemeTokens.onPrimary,
    [iconButtonTokens.iconColor$focus]: colorSchemeTokens.onPrimary,
    [iconButtonTokens.iconColor$hover]: colorSchemeTokens.onPrimary,
    [iconButtonTokens.iconColor$pressed]: colorSchemeTokens.onPrimary,
    [iconButtonTokens.iconColor$disabled]: colorSchemeTokens.onPrimary,

    [iconButtonTokens.toggleIconColor]: colorSchemeTokens.primary,
    [iconButtonTokens.toggleIconColor$focus]: colorSchemeTokens.primary,
    [iconButtonTokens.toggleIconColor$hover]: colorSchemeTokens.primary,
    [iconButtonTokens.toggleIconColor$pressed]: colorSchemeTokens.primary,

    [iconButtonTokens.toggleSelectedIconColor]: colorSchemeTokens.onPrimary,
    [iconButtonTokens.toggleSelectedIconColor$focus]:
      colorSchemeTokens.onPrimary,
    [iconButtonTokens.toggleSelectedIconColor$hover]:
      colorSchemeTokens.onPrimary,
    [iconButtonTokens.toggleSelectedIconColor$pressed]:
      colorSchemeTokens.onPrimary,

    [iconButtonTokens.stateLayerColor$hover]: colorSchemeTokens.onPrimary,
    [iconButtonTokens.stateLayerColor$pressed]: colorSchemeTokens.onPrimary,

    [iconButtonTokens.toggleStateLayerColor$hover]: colorSchemeTokens.primary,
    [iconButtonTokens.toggleStateLayerColor$pressed]: colorSchemeTokens.primary,

    [iconButtonTokens.toggleSelectedStateLayerColor$hover]:
      colorSchemeTokens.onPrimary,
    [iconButtonTokens.toggleSelectedStateLayerColor$pressed]:
      colorSchemeTokens.onPrimary,
  },
});
