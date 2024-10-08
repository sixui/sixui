import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { stateTokens } from '~/themes/base/state.stylex';
import { listItemTokens } from '../ListItem.stylex';

export const standardListItemStyles = stylex.create({
  host: {
    [listItemTokens.containerColor]: 'transparent',

    [listItemTokens.selectedContainerColor]: colorSchemeTokens.primaryContainer,
    [listItemTokens.selectedContainerOpacity]: '1',

    [listItemTokens.textColor]: colorSchemeTokens.onSurface,
    [listItemTokens.textColor$focus]: colorSchemeTokens.onSurface,
    [listItemTokens.textColor$hover]: colorSchemeTokens.onSurface,
    [listItemTokens.textColor$pressed]: colorSchemeTokens.onSurface,

    [listItemTokens.selectedTextColor]: colorSchemeTokens.onPrimaryContainer,
    [listItemTokens.selectedTextColor$focus]:
      colorSchemeTokens.onPrimaryContainer,
    [listItemTokens.selectedTextColor$hover]:
      colorSchemeTokens.onPrimaryContainer,
    [listItemTokens.selectedTextColor$pressed]:
      colorSchemeTokens.onPrimaryContainer,

    [listItemTokens.nonTextColor]: colorSchemeTokens.onSurfaceVariant,
    [listItemTokens.nonTextColor$focus]: colorSchemeTokens.onSurfaceVariant,
    [listItemTokens.nonTextColor$hover]: colorSchemeTokens.onSurfaceVariant,
    [listItemTokens.nonTextColor$pressed]: colorSchemeTokens.onSurfaceVariant,

    [listItemTokens.selectedNonTextColor]: colorSchemeTokens.onPrimaryContainer,
    [listItemTokens.selectedNonTextColor$focus]:
      colorSchemeTokens.onPrimaryContainer,
    [listItemTokens.selectedNonTextColor$hover]:
      colorSchemeTokens.onPrimaryContainer,
    [listItemTokens.selectedNonTextColor$pressed]:
      colorSchemeTokens.onPrimaryContainer,

    [listItemTokens.stateLayerColor$hover]: colorSchemeTokens.onSurface,
    [listItemTokens.stateLayerOpacity$hover]:
      stateTokens.stateLayerOpacity$hover,
    [listItemTokens.stateLayerColor$pressed]: colorSchemeTokens.primary,
    [listItemTokens.stateLayerOpacity$pressed]:
      stateTokens.stateLayerOpacity$pressed,

    [listItemTokens.selectedStateLayerColor$hover]: colorSchemeTokens.onSurface,
    [listItemTokens.stateLayerColor$pressed]: colorSchemeTokens.primary,

    [listItemTokens.leadingIconColor]: colorSchemeTokens.onSurfaceVariant,
    [listItemTokens.leadingIconColor$focus]: colorSchemeTokens.onSurfaceVariant,
    [listItemTokens.leadingIconColor$hover]: colorSchemeTokens.onSurfaceVariant,
    [listItemTokens.leadingIconColor$pressed]:
      colorSchemeTokens.onSurfaceVariant,

    [listItemTokens.selectedLeadingIconColor]:
      colorSchemeTokens.onPrimaryContainer,
    [listItemTokens.selectedLeadingIconColor$focus]:
      colorSchemeTokens.onPrimaryContainer,
    [listItemTokens.selectedLeadingIconColor$hover]:
      colorSchemeTokens.onPrimaryContainer,
    [listItemTokens.selectedLeadingIconColor$pressed]:
      colorSchemeTokens.onPrimaryContainer,

    [listItemTokens.trailingIconColor]: colorSchemeTokens.onSurfaceVariant,
    [listItemTokens.trailingIconColor$focus]:
      colorSchemeTokens.onSurfaceVariant,
    [listItemTokens.trailingIconColor$hover]:
      colorSchemeTokens.onSurfaceVariant,
    [listItemTokens.trailingIconColor$pressed]:
      colorSchemeTokens.onSurfaceVariant,

    [listItemTokens.selectedTrailingIconColor]:
      colorSchemeTokens.onPrimaryContainer,
    [listItemTokens.selectedTrailingIconColor$focus]:
      colorSchemeTokens.onPrimaryContainer,
    [listItemTokens.selectedTrailingIconColor$hover]:
      colorSchemeTokens.onPrimaryContainer,
    [listItemTokens.selectedTrailingIconColor$pressed]:
      colorSchemeTokens.onPrimaryContainer,
  },
});
