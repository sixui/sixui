import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';
import { listItemTokens } from '../ListItem.stylex';

export const standardListItemStyles = stylex.create({
  host: {
    [listItemTokens.containerColor]: 'transparent',

    [listItemTokens.selectedContainerColor]: colorRolesVars.primaryContainer,
    [listItemTokens.selectedContainerOpacity]: '1',

    [listItemTokens.textColor]: colorRolesVars.onSurface,
    [listItemTokens.textColor$focus]: colorRolesVars.onSurface,
    [listItemTokens.textColor$hover]: colorRolesVars.onSurface,
    [listItemTokens.textColor$pressed]: colorRolesVars.onSurface,

    [listItemTokens.selectedTextColor]: colorRolesVars.onPrimaryContainer,
    [listItemTokens.selectedTextColor$focus]: colorRolesVars.onPrimaryContainer,
    [listItemTokens.selectedTextColor$hover]: colorRolesVars.onPrimaryContainer,
    [listItemTokens.selectedTextColor$pressed]:
      colorRolesVars.onPrimaryContainer,

    [listItemTokens.nonTextColor]: colorRolesVars.onSurfaceVariant,
    [listItemTokens.nonTextColor$focus]: colorRolesVars.onSurfaceVariant,
    [listItemTokens.nonTextColor$hover]: colorRolesVars.onSurfaceVariant,
    [listItemTokens.nonTextColor$pressed]: colorRolesVars.onSurfaceVariant,

    [listItemTokens.selectedNonTextColor]: colorRolesVars.onPrimaryContainer,
    [listItemTokens.selectedNonTextColor$focus]:
      colorRolesVars.onPrimaryContainer,
    [listItemTokens.selectedNonTextColor$hover]:
      colorRolesVars.onPrimaryContainer,
    [listItemTokens.selectedNonTextColor$pressed]:
      colorRolesVars.onPrimaryContainer,

    [listItemTokens.stateLayerColor$hover]: colorRolesVars.onSurface,
    [listItemTokens.stateLayerOpacity$hover]: stateVars.stateLayerOpacity$hover,
    [listItemTokens.stateLayerColor$pressed]: colorRolesVars.primary,
    [listItemTokens.stateLayerOpacity$pressed]:
      stateVars.stateLayerOpacity$pressed,

    [listItemTokens.leadingIconColor]: colorRolesVars.onSurfaceVariant,
    [listItemTokens.leadingIconColor$focus]: colorRolesVars.onSurfaceVariant,
    [listItemTokens.leadingIconColor$hover]: colorRolesVars.onSurfaceVariant,
    [listItemTokens.leadingIconColor$pressed]: colorRolesVars.onSurfaceVariant,

    [listItemTokens.selectedLeadingIconColor]: colorRolesVars.primary,
    [listItemTokens.selectedLeadingIconColor$focus]: colorRolesVars.primary,
    [listItemTokens.selectedLeadingIconColor$hover]: colorRolesVars.primary,
    [listItemTokens.selectedLeadingIconColor$pressed]: colorRolesVars.primary,

    [listItemTokens.trailingIconColor]: colorRolesVars.onSurfaceVariant,
    [listItemTokens.trailingIconColor$focus]: colorRolesVars.onSurfaceVariant,
    [listItemTokens.trailingIconColor$hover]: colorRolesVars.onSurfaceVariant,
    [listItemTokens.trailingIconColor$pressed]: colorRolesVars.onSurfaceVariant,

    [listItemTokens.selectedTrailingIconColor]: colorRolesVars.primary,
    [listItemTokens.selectedTrailingIconColor$focus]: colorRolesVars.primary,
    [listItemTokens.selectedTrailingIconColor$hover]: colorRolesVars.primary,
    [listItemTokens.selectedTrailingIconColor$pressed]: colorRolesVars.primary,
  },
});
