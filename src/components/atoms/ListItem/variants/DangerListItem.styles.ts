import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { stateTokens } from '@/themes/base/tokens/state.stylex';
import { listItemTokens } from '../ListItem.stylex';

export const dangerListItemStyles = stylex.create({
  host: {
    [listItemTokens.containerColor]: 'transparent',

    [listItemTokens.selectedContainerColor]: colorRolesTokens.errorContainer,
    [listItemTokens.selectedContainerOpacity]: '1',

    [listItemTokens.textColor]: colorRolesTokens.error,
    [listItemTokens.textColor$focus]: colorRolesTokens.error,
    [listItemTokens.textColor$hover]: colorRolesTokens.onErrorContainer,
    [listItemTokens.textColor$pressed]: colorRolesTokens.onErrorContainer,

    [listItemTokens.selectedTextColor]: colorRolesTokens.onErrorContainer,
    [listItemTokens.selectedTextColor$focus]: colorRolesTokens.onErrorContainer,
    [listItemTokens.selectedTextColor$hover]: colorRolesTokens.onErrorContainer,
    [listItemTokens.selectedTextColor$pressed]:
      colorRolesTokens.onErrorContainer,

    [listItemTokens.nonTextColor]: colorRolesTokens.error,
    [listItemTokens.nonTextColor$focus]: colorRolesTokens.onErrorContainer,
    [listItemTokens.nonTextColor$hover]: colorRolesTokens.onErrorContainer,
    [listItemTokens.nonTextColor$pressed]: colorRolesTokens.onErrorContainer,

    [listItemTokens.selectedNonTextColor]: colorRolesTokens.onErrorContainer,
    [listItemTokens.selectedNonTextColor$focus]:
      colorRolesTokens.onErrorContainer,
    [listItemTokens.selectedNonTextColor$hover]:
      colorRolesTokens.onErrorContainer,
    [listItemTokens.selectedNonTextColor$pressed]:
      colorRolesTokens.onErrorContainer,

    [listItemTokens.stateLayerColor$hover]: colorRolesTokens.errorContainer,
    [listItemTokens.stateLayerOpacity$hover]: '1',
    [listItemTokens.stateLayerColor$pressed]: colorRolesTokens.error,
    [listItemTokens.stateLayerOpacity$pressed]:
      stateTokens.stateLayerOpacity$pressed,

    [listItemTokens.leadingIconColor]: colorRolesTokens.error,
    [listItemTokens.leadingIconColor$focus]: colorRolesTokens.onErrorContainer,
    [listItemTokens.leadingIconColor$hover]: colorRolesTokens.onErrorContainer,
    [listItemTokens.leadingIconColor$pressed]:
      colorRolesTokens.onErrorContainer,

    [listItemTokens.selectedLeadingIconColor]:
      colorRolesTokens.onErrorContainer,
    [listItemTokens.selectedLeadingIconColor$focus]:
      colorRolesTokens.onErrorContainer,
    [listItemTokens.selectedLeadingIconColor$hover]:
      colorRolesTokens.onErrorContainer,
    [listItemTokens.selectedLeadingIconColor$pressed]:
      colorRolesTokens.onErrorContainer,

    [listItemTokens.trailingIconColor]: colorRolesTokens.onSurfaceVariant,
    [listItemTokens.trailingIconColor$focus]: colorRolesTokens.onErrorContainer,
    [listItemTokens.trailingIconColor$hover]: colorRolesTokens.onErrorContainer,
    [listItemTokens.trailingIconColor$pressed]:
      colorRolesTokens.onErrorContainer,

    [listItemTokens.selectedTrailingIconColor]:
      colorRolesTokens.onErrorContainer,
    [listItemTokens.selectedTrailingIconColor$focus]:
      colorRolesTokens.onErrorContainer,
    [listItemTokens.selectedTrailingIconColor$hover]:
      colorRolesTokens.onErrorContainer,
    [listItemTokens.selectedTrailingIconColor$pressed]:
      colorRolesTokens.onErrorContainer,
  },
});
