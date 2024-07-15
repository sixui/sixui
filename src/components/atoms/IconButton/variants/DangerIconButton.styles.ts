import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { iconButtonTokens } from '../IconButton.stylex';

export const dangerIconButtonStyles = stylex.create({
  host: {
    [iconButtonTokens.containerColor]: colorRolesTokens.errorContainer,
    [iconButtonTokens.containerColor$disabled]:
      colorRolesTokens.onErrorContainer,

    [iconButtonTokens.unselectedContainerColor]:
      colorRolesTokens.surfaceContainerHighest,

    [iconButtonTokens.selectedContainerColor]: colorRolesTokens.errorContainer,

    [iconButtonTokens.iconColor]: colorRolesTokens.onErrorContainer,
    [iconButtonTokens.iconColor$focus]: colorRolesTokens.onErrorContainer,
    [iconButtonTokens.iconColor$hover]: colorRolesTokens.onErrorContainer,
    [iconButtonTokens.iconColor$pressed]: colorRolesTokens.onErrorContainer,
    [iconButtonTokens.iconColor$disabled]: colorRolesTokens.onErrorContainer,

    [iconButtonTokens.toggleIconColor]: colorRolesTokens.onErrorContainer,
    [iconButtonTokens.toggleIconColor$focus]: colorRolesTokens.onErrorContainer,
    [iconButtonTokens.toggleIconColor$hover]: colorRolesTokens.onErrorContainer,
    [iconButtonTokens.toggleIconColor$pressed]:
      colorRolesTokens.onErrorContainer,

    [iconButtonTokens.toggleSelectedIconColor]:
      colorRolesTokens.onErrorContainer,
    [iconButtonTokens.toggleSelectedIconColor$focus]:
      colorRolesTokens.onErrorContainer,
    [iconButtonTokens.toggleSelectedIconColor$hover]:
      colorRolesTokens.onErrorContainer,
    [iconButtonTokens.toggleSelectedIconColor$pressed]:
      colorRolesTokens.onErrorContainer,

    [iconButtonTokens.stateLayerColor$hover]: colorRolesTokens.onErrorContainer,
    [iconButtonTokens.stateLayerColor$pressed]:
      colorRolesTokens.onErrorContainer,

    [iconButtonTokens.toggleStateLayerColor$hover]: colorRolesTokens.error,
    [iconButtonTokens.toggleStateLayerColor$pressed]: colorRolesTokens.error,

    [iconButtonTokens.toggleSelectedStateLayerColor$hover]:
      colorRolesTokens.onErrorContainer,
    [iconButtonTokens.toggleSelectedStateLayerColor$pressed]:
      colorRolesTokens.onErrorContainer,
  },
});
