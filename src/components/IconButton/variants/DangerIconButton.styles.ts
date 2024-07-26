import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { iconButtonTokens } from '../IconButton.stylex';

export const dangerIconButtonStyles = stylex.create({
  host: {
    [iconButtonTokens.containerColor]: colorSchemeTokens.errorContainer,
    [iconButtonTokens.containerColor$disabled]:
      colorSchemeTokens.onErrorContainer,

    [iconButtonTokens.unselectedContainerColor]:
      colorSchemeTokens.surfaceContainerHighest,

    [iconButtonTokens.selectedContainerColor]: colorSchemeTokens.errorContainer,

    [iconButtonTokens.iconColor]: colorSchemeTokens.onErrorContainer,
    [iconButtonTokens.iconColor$focus]: colorSchemeTokens.onErrorContainer,
    [iconButtonTokens.iconColor$hover]: colorSchemeTokens.onErrorContainer,
    [iconButtonTokens.iconColor$pressed]: colorSchemeTokens.onErrorContainer,
    [iconButtonTokens.iconColor$disabled]: colorSchemeTokens.onErrorContainer,

    [iconButtonTokens.toggleIconColor]: colorSchemeTokens.onErrorContainer,
    [iconButtonTokens.toggleIconColor$focus]:
      colorSchemeTokens.onErrorContainer,
    [iconButtonTokens.toggleIconColor$hover]:
      colorSchemeTokens.onErrorContainer,
    [iconButtonTokens.toggleIconColor$pressed]:
      colorSchemeTokens.onErrorContainer,

    [iconButtonTokens.toggleSelectedIconColor]:
      colorSchemeTokens.onErrorContainer,
    [iconButtonTokens.toggleSelectedIconColor$focus]:
      colorSchemeTokens.onErrorContainer,
    [iconButtonTokens.toggleSelectedIconColor$hover]:
      colorSchemeTokens.onErrorContainer,
    [iconButtonTokens.toggleSelectedIconColor$pressed]:
      colorSchemeTokens.onErrorContainer,

    [iconButtonTokens.stateLayerColor$hover]:
      colorSchemeTokens.onErrorContainer,
    [iconButtonTokens.stateLayerColor$pressed]:
      colorSchemeTokens.onErrorContainer,

    [iconButtonTokens.toggleStateLayerColor$hover]: colorSchemeTokens.error,
    [iconButtonTokens.toggleStateLayerColor$pressed]: colorSchemeTokens.error,

    [iconButtonTokens.toggleSelectedStateLayerColor$hover]:
      colorSchemeTokens.onErrorContainer,
    [iconButtonTokens.toggleSelectedStateLayerColor$pressed]:
      colorSchemeTokens.onErrorContainer,
  },
});
