import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { stateTokens } from '@/themes/base/tokens/state.stylex';
import { listItemTokens } from '../ListItem.stylex';

export const standardListItemStyles = stylex.create({
  host: {
    [listItemTokens.containerColor]: 'transparent',

    [listItemTokens.selectedContainerColor]: colorRolesTokens.primaryContainer,
    [listItemTokens.selectedContainerOpacity]: '1',

    [listItemTokens.textColor]: colorRolesTokens.onSurface,
    [listItemTokens.textColor$focus]: colorRolesTokens.onSurface,
    [listItemTokens.textColor$hover]: colorRolesTokens.onSurface,
    [listItemTokens.textColor$pressed]: colorRolesTokens.onSurface,

    [listItemTokens.selectedTextColor]: colorRolesTokens.onPrimaryContainer,
    [listItemTokens.selectedTextColor$focus]:
      colorRolesTokens.onPrimaryContainer,
    [listItemTokens.selectedTextColor$hover]:
      colorRolesTokens.onPrimaryContainer,
    [listItemTokens.selectedTextColor$pressed]:
      colorRolesTokens.onPrimaryContainer,

    [listItemTokens.nonTextColor]: colorRolesTokens.onSurfaceVariant,
    [listItemTokens.nonTextColor$focus]: colorRolesTokens.onSurfaceVariant,
    [listItemTokens.nonTextColor$hover]: colorRolesTokens.onSurfaceVariant,
    [listItemTokens.nonTextColor$pressed]: colorRolesTokens.onSurfaceVariant,

    [listItemTokens.selectedNonTextColor]: colorRolesTokens.onPrimaryContainer,
    [listItemTokens.selectedNonTextColor$focus]:
      colorRolesTokens.onPrimaryContainer,
    [listItemTokens.selectedNonTextColor$hover]:
      colorRolesTokens.onPrimaryContainer,
    [listItemTokens.selectedNonTextColor$pressed]:
      colorRolesTokens.onPrimaryContainer,

    [listItemTokens.stateLayerColor$hover]: colorRolesTokens.onSurface,
    [listItemTokens.stateLayerOpacity$hover]: stateTokens.stateLayerOpacity$hover,
    [listItemTokens.stateLayerColor$pressed]: colorRolesTokens.primary,
    [listItemTokens.stateLayerOpacity$pressed]:
      stateTokens.stateLayerOpacity$pressed,

    [listItemTokens.leadingIconColor]: colorRolesTokens.onSurfaceVariant,
    [listItemTokens.leadingIconColor$focus]: colorRolesTokens.onSurfaceVariant,
    [listItemTokens.leadingIconColor$hover]: colorRolesTokens.onSurfaceVariant,
    [listItemTokens.leadingIconColor$pressed]:
      colorRolesTokens.onSurfaceVariant,

    [listItemTokens.selectedLeadingIconColor]: colorRolesTokens.primary,
    [listItemTokens.selectedLeadingIconColor$focus]: colorRolesTokens.primary,
    [listItemTokens.selectedLeadingIconColor$hover]: colorRolesTokens.primary,
    [listItemTokens.selectedLeadingIconColor$pressed]: colorRolesTokens.primary,

    [listItemTokens.trailingIconColor]: colorRolesTokens.onSurfaceVariant,
    [listItemTokens.trailingIconColor$focus]: colorRolesTokens.onSurfaceVariant,
    [listItemTokens.trailingIconColor$hover]: colorRolesTokens.onSurfaceVariant,
    [listItemTokens.trailingIconColor$pressed]:
      colorRolesTokens.onSurfaceVariant,

    [listItemTokens.selectedTrailingIconColor]: colorRolesTokens.primary,
    [listItemTokens.selectedTrailingIconColor$focus]: colorRolesTokens.primary,
    [listItemTokens.selectedTrailingIconColor$hover]: colorRolesTokens.primary,
    [listItemTokens.selectedTrailingIconColor$pressed]:
      colorRolesTokens.primary,
  },
});
