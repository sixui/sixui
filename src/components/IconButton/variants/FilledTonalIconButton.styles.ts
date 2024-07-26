import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { iconButtonTokens } from '../IconButton.stylex';

export const filledTonalIconButtonStyles = stylex.create({
  host: {
    [iconButtonTokens.containerColor]: colorSchemeTokens.secondaryContainer,
    [iconButtonTokens.containerColor$disabled]: colorSchemeTokens.onSurface,

    [iconButtonTokens.unselectedContainerColor]:
      colorSchemeTokens.surfaceContainerHighest,

    [iconButtonTokens.selectedContainerColor]:
      colorSchemeTokens.secondaryContainer,

    [iconButtonTokens.iconColor]: colorSchemeTokens.onSecondaryContainer,
    [iconButtonTokens.iconColor$focus]: colorSchemeTokens.onSecondaryContainer,
    [iconButtonTokens.iconColor$hover]: colorSchemeTokens.onSecondaryContainer,
    [iconButtonTokens.iconColor$pressed]:
      colorSchemeTokens.onSecondaryContainer,
    [iconButtonTokens.iconColor$disabled]:
      colorSchemeTokens.onSecondaryContainer,

    [iconButtonTokens.toggleIconColor]: colorSchemeTokens.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$focus]:
      colorSchemeTokens.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$hover]:
      colorSchemeTokens.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$pressed]:
      colorSchemeTokens.onSurfaceVariant,

    [iconButtonTokens.toggleSelectedIconColor]:
      colorSchemeTokens.onSecondaryContainer,
    [iconButtonTokens.toggleSelectedIconColor$focus]:
      colorSchemeTokens.onSecondaryContainer,
    [iconButtonTokens.toggleSelectedIconColor$hover]:
      colorSchemeTokens.onSecondaryContainer,
    [iconButtonTokens.toggleSelectedIconColor$pressed]:
      colorSchemeTokens.onSecondaryContainer,

    [iconButtonTokens.stateLayerColor$hover]:
      colorSchemeTokens.onSecondaryContainer,
    [iconButtonTokens.stateLayerColor$pressed]:
      colorSchemeTokens.onSecondaryContainer,

    [iconButtonTokens.toggleStateLayerColor$hover]:
      colorSchemeTokens.onSurfaceVariant,
    [iconButtonTokens.toggleStateLayerColor$pressed]:
      colorSchemeTokens.onSurfaceVariant,

    [iconButtonTokens.toggleSelectedStateLayerColor$hover]:
      colorSchemeTokens.onSecondaryContainer,
    [iconButtonTokens.toggleSelectedStateLayerColor$pressed]:
      colorSchemeTokens.onSecondaryContainer,
  },
});
