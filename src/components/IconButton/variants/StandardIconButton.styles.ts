import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { iconButtonTokens } from '../IconButton.stylex';

export const standardIconButtonStyles = stylex.create({
  host: {
    [iconButtonTokens.containerColor]: 'transparent',
    [iconButtonTokens.containerColor$disabled]: 'transparent',

    [iconButtonTokens.iconColor]: colorSchemeTokens.onSurfaceVariant,
    [iconButtonTokens.iconColor$focus]: colorSchemeTokens.onSurfaceVariant,
    [iconButtonTokens.iconColor$hover]: colorSchemeTokens.onSurfaceVariant,
    [iconButtonTokens.iconColor$pressed]: colorSchemeTokens.onSurfaceVariant,
    [iconButtonTokens.iconColor$disabled]: colorSchemeTokens.onSurface,

    [iconButtonTokens.toggleIconColor]: colorSchemeTokens.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$focus]:
      colorSchemeTokens.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$hover]:
      colorSchemeTokens.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$pressed]:
      colorSchemeTokens.onSurfaceVariant,

    [iconButtonTokens.toggleSelectedIconColor]: colorSchemeTokens.primary,
    [iconButtonTokens.toggleSelectedIconColor$focus]: colorSchemeTokens.primary,
    [iconButtonTokens.toggleSelectedIconColor$hover]: colorSchemeTokens.primary,
    [iconButtonTokens.toggleSelectedIconColor$pressed]:
      colorSchemeTokens.primary,

    [iconButtonTokens.stateLayerColor$hover]:
      colorSchemeTokens.onSurfaceVariant,
    [iconButtonTokens.stateLayerColor$pressed]:
      colorSchemeTokens.onSurfaceVariant,

    [iconButtonTokens.toggleStateLayerColor$hover]:
      colorSchemeTokens.onSurfaceVariant,
    [iconButtonTokens.toggleStateLayerColor$pressed]:
      colorSchemeTokens.onSurfaceVariant,

    [iconButtonTokens.toggleSelectedStateLayerColor$hover]:
      colorSchemeTokens.onSurfaceVariant,
    [iconButtonTokens.toggleSelectedStateLayerColor$pressed]:
      colorSchemeTokens.onSurfaceVariant,
  },
});
