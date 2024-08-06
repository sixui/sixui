import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { iconButtonTokens } from '../IconButton.stylex';

export const snackbarIconButtonStyles = stylex.create({
  host: {
    [iconButtonTokens.containerSize]: '32px',
    [iconButtonTokens.containerColor]: 'transparent',
    [iconButtonTokens.containerColor$disabled]: 'transparent',

    [iconButtonTokens.unselectedContainerColor]: 'transparent',

    [iconButtonTokens.selectedContainerColor]: 'transparent',

    [iconButtonTokens.iconColor]: colorSchemeTokens.inverseOnSurface,
    [iconButtonTokens.iconColor$focus]: colorSchemeTokens.inverseOnSurface,
    [iconButtonTokens.iconColor$hover]: colorSchemeTokens.inverseOnSurface,
    [iconButtonTokens.iconColor$pressed]: colorSchemeTokens.inverseOnSurface,
    [iconButtonTokens.iconColor$disabled]: colorSchemeTokens.inverseOnSurface,

    [iconButtonTokens.toggleIconColor]: colorSchemeTokens.inverseOnSurface,
    [iconButtonTokens.toggleIconColor$focus]:
      colorSchemeTokens.inverseOnSurface,
    [iconButtonTokens.toggleIconColor$hover]:
      colorSchemeTokens.inverseOnSurface,
    [iconButtonTokens.toggleIconColor$pressed]:
      colorSchemeTokens.inverseOnSurface,

    [iconButtonTokens.toggleSelectedIconColor]:
      colorSchemeTokens.inverseOnSurface,
    [iconButtonTokens.toggleSelectedIconColor$focus]:
      colorSchemeTokens.inverseOnSurface,
    [iconButtonTokens.toggleSelectedIconColor$hover]:
      colorSchemeTokens.inverseOnSurface,
    [iconButtonTokens.toggleSelectedIconColor$pressed]:
      colorSchemeTokens.inverseOnSurface,

    [iconButtonTokens.stateLayerColor$hover]:
      colorSchemeTokens.inverseOnSurface,
    [iconButtonTokens.stateLayerColor$pressed]:
      colorSchemeTokens.inverseOnSurface,

    [iconButtonTokens.toggleStateLayerColor$hover]:
      colorSchemeTokens.inverseOnSurface,
    [iconButtonTokens.toggleStateLayerColor$pressed]:
      colorSchemeTokens.inverseOnSurface,

    [iconButtonTokens.toggleSelectedStateLayerColor$hover]:
      colorSchemeTokens.inverseOnSurface,
    [iconButtonTokens.toggleSelectedStateLayerColor$pressed]:
      colorSchemeTokens.inverseOnSurface,
  },
});
