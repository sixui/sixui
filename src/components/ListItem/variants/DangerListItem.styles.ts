import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { stateTokens } from '@/themes/base/state.stylex';
import { listItemTokens } from '../ListItem.stylex';

export const dangerListItemStyles = stylex.create({
  host: {
    [listItemTokens.containerColor]: 'transparent',

    [listItemTokens.selectedContainerColor]: colorSchemeTokens.errorContainer,
    [listItemTokens.selectedContainerOpacity]: '1',

    [listItemTokens.textColor]: colorSchemeTokens.error,
    [listItemTokens.textColor$focus]: colorSchemeTokens.error,
    [listItemTokens.textColor$hover]: colorSchemeTokens.onErrorContainer,
    [listItemTokens.textColor$pressed]: colorSchemeTokens.onErrorContainer,

    [listItemTokens.selectedTextColor]: colorSchemeTokens.onErrorContainer,
    [listItemTokens.selectedTextColor$focus]:
      colorSchemeTokens.onErrorContainer,
    [listItemTokens.selectedTextColor$hover]:
      colorSchemeTokens.onErrorContainer,
    [listItemTokens.selectedTextColor$pressed]:
      colorSchemeTokens.onErrorContainer,

    [listItemTokens.nonTextColor]: colorSchemeTokens.error,
    [listItemTokens.nonTextColor$focus]: colorSchemeTokens.onErrorContainer,
    [listItemTokens.nonTextColor$hover]: colorSchemeTokens.onErrorContainer,
    [listItemTokens.nonTextColor$pressed]: colorSchemeTokens.onErrorContainer,

    [listItemTokens.selectedNonTextColor]: colorSchemeTokens.onErrorContainer,
    [listItemTokens.selectedNonTextColor$focus]:
      colorSchemeTokens.onErrorContainer,
    [listItemTokens.selectedNonTextColor$hover]:
      colorSchemeTokens.onErrorContainer,
    [listItemTokens.selectedNonTextColor$pressed]:
      colorSchemeTokens.onErrorContainer,

    [listItemTokens.stateLayerColor$hover]: colorSchemeTokens.errorContainer,
    [listItemTokens.stateLayerOpacity$hover]: '1',
    [listItemTokens.stateLayerColor$pressed]: colorSchemeTokens.error,
    [listItemTokens.stateLayerOpacity$pressed]:
      stateTokens.stateLayerOpacity$pressed,

    [listItemTokens.leadingIconColor]: colorSchemeTokens.error,
    [listItemTokens.leadingIconColor$focus]: colorSchemeTokens.onErrorContainer,
    [listItemTokens.leadingIconColor$hover]: colorSchemeTokens.onErrorContainer,
    [listItemTokens.leadingIconColor$pressed]:
      colorSchemeTokens.onErrorContainer,

    [listItemTokens.selectedLeadingIconColor]:
      colorSchemeTokens.onErrorContainer,
    [listItemTokens.selectedLeadingIconColor$focus]:
      colorSchemeTokens.onErrorContainer,
    [listItemTokens.selectedLeadingIconColor$hover]:
      colorSchemeTokens.onErrorContainer,
    [listItemTokens.selectedLeadingIconColor$pressed]:
      colorSchemeTokens.onErrorContainer,

    [listItemTokens.trailingIconColor]: colorSchemeTokens.onSurfaceVariant,
    [listItemTokens.trailingIconColor$focus]:
      colorSchemeTokens.onErrorContainer,
    [listItemTokens.trailingIconColor$hover]:
      colorSchemeTokens.onErrorContainer,
    [listItemTokens.trailingIconColor$pressed]:
      colorSchemeTokens.onErrorContainer,

    [listItemTokens.selectedTrailingIconColor]:
      colorSchemeTokens.onErrorContainer,
    [listItemTokens.selectedTrailingIconColor$focus]:
      colorSchemeTokens.onErrorContainer,
    [listItemTokens.selectedTrailingIconColor$hover]:
      colorSchemeTokens.onErrorContainer,
    [listItemTokens.selectedTrailingIconColor$pressed]:
      colorSchemeTokens.onErrorContainer,
  },
});
