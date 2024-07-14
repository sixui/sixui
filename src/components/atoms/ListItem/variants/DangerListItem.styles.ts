import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';
import { listItemTokens } from '../ListItem.stylex';

export const dangerListItemStyles = stylex.create({
  host: {
    [listItemTokens.containerColor]: 'transparent',

    [listItemTokens.selectedContainerColor]: colorRolesVars.errorContainer,
    [listItemTokens.selectedContainerOpacity]: '1',

    [listItemTokens.textColor]: colorRolesVars.error,
    [listItemTokens.textColor$focus]: colorRolesVars.error,
    [listItemTokens.textColor$hover]: colorRolesVars.onErrorContainer,
    [listItemTokens.textColor$pressed]: colorRolesVars.onErrorContainer,

    [listItemTokens.selectedTextColor]: colorRolesVars.onErrorContainer,
    [listItemTokens.selectedTextColor$focus]: colorRolesVars.onErrorContainer,
    [listItemTokens.selectedTextColor$hover]: colorRolesVars.onErrorContainer,
    [listItemTokens.selectedTextColor$pressed]: colorRolesVars.onErrorContainer,

    [listItemTokens.nonTextColor]: colorRolesVars.error,
    [listItemTokens.nonTextColor$focus]: colorRolesVars.onErrorContainer,
    [listItemTokens.nonTextColor$hover]: colorRolesVars.onErrorContainer,
    [listItemTokens.nonTextColor$pressed]: colorRolesVars.onErrorContainer,

    [listItemTokens.selectedNonTextColor]: colorRolesVars.onErrorContainer,
    [listItemTokens.selectedNonTextColor$focus]:
      colorRolesVars.onErrorContainer,
    [listItemTokens.selectedNonTextColor$hover]:
      colorRolesVars.onErrorContainer,
    [listItemTokens.selectedNonTextColor$pressed]:
      colorRolesVars.onErrorContainer,

    [listItemTokens.stateLayerColor$hover]: colorRolesVars.errorContainer,
    [listItemTokens.stateLayerOpacity$hover]: '1',
    [listItemTokens.stateLayerColor$pressed]: colorRolesVars.error,
    [listItemTokens.stateLayerOpacity$pressed]:
      stateVars.stateLayerOpacity$pressed,

    [listItemTokens.leadingIconColor]: colorRolesVars.error,
    [listItemTokens.leadingIconColor$focus]: colorRolesVars.onErrorContainer,
    [listItemTokens.leadingIconColor$hover]: colorRolesVars.onErrorContainer,
    [listItemTokens.leadingIconColor$pressed]: colorRolesVars.onErrorContainer,

    [listItemTokens.selectedLeadingIconColor]: colorRolesVars.onErrorContainer,
    [listItemTokens.selectedLeadingIconColor$focus]:
      colorRolesVars.onErrorContainer,
    [listItemTokens.selectedLeadingIconColor$hover]:
      colorRolesVars.onErrorContainer,
    [listItemTokens.selectedLeadingIconColor$pressed]:
      colorRolesVars.onErrorContainer,

    [listItemTokens.trailingIconColor]: colorRolesVars.onSurfaceVariant,
    [listItemTokens.trailingIconColor$focus]: colorRolesVars.onErrorContainer,
    [listItemTokens.trailingIconColor$hover]: colorRolesVars.onErrorContainer,
    [listItemTokens.trailingIconColor$pressed]: colorRolesVars.onErrorContainer,

    [listItemTokens.selectedTrailingIconColor]: colorRolesVars.onErrorContainer,
    [listItemTokens.selectedTrailingIconColor$focus]:
      colorRolesVars.onErrorContainer,
    [listItemTokens.selectedTrailingIconColor$hover]:
      colorRolesVars.onErrorContainer,
    [listItemTokens.selectedTrailingIconColor$pressed]:
      colorRolesVars.onErrorContainer,
  },
});
