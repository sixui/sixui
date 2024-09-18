import stylex from '@stylexjs/stylex';

import { spacingTokens } from '~/themes/base/spacing.stylex';
import { itemTokens } from '../Item/Item.stylex';
import { listItemTokens } from '../ListItem/ListItem.stylex';
import { navigationDrawerContentDestinationTokens as tokens } from './NavigationDrawerContentDestination.stylex';

export type INavigationDrawerContentDestinationStylesKey =
  keyof typeof navigationDrawerContentDestinationStyles;
export const navigationDrawerContentDestinationStyles = stylex.create({
  host: {
    [listItemTokens.trailingSpace]: spacingTokens.padding$6,

    [listItemTokens.selectedContainerColor]: tokens.activeIndicatorColor,
    [listItemTokens.containerShape]: tokens.activeIndicatorShape,

    [listItemTokens.textColor]: tokens.inactiveLabelTextColor,
    [listItemTokens.textColor$hover]: tokens.inactiveLabelTextColor$hover,
    [listItemTokens.textColor$focus]: tokens.inactiveLabelTextColor$focus,
    [listItemTokens.textColor$pressed]: tokens.inactiveLabelTextColor$pressed,

    [listItemTokens.selectedTextColor]: tokens.activeLabelTextColor,
    [listItemTokens.selectedTextColor$hover]: tokens.activeLabelTextColor$hover,
    [listItemTokens.selectedTextColor$focus]: tokens.activeLabelTextColor$focus,
    [listItemTokens.selectedTextColor$pressed]:
      tokens.activeLabelTextColor$pressed,

    [listItemTokens.leadingIconSize]: tokens.iconSize,

    [listItemTokens.leadingIconColor]: tokens.inactiveIconColor,
    [listItemTokens.leadingIconColor$hover]: tokens.inactiveIconColor$hover,
    [listItemTokens.leadingIconColor$focus]: tokens.inactiveIconColor$focus,
    [listItemTokens.leadingIconColor$pressed]: tokens.inactiveIconColor$pressed,

    [listItemTokens.selectedLeadingIconColor]: tokens.activeIconColor,
    [listItemTokens.selectedLeadingIconColor$hover]:
      tokens.activeIconColor$hover,
    [listItemTokens.selectedLeadingIconColor$focus]:
      tokens.activeIconColor$focus,
    [listItemTokens.selectedLeadingIconColor$pressed]:
      tokens.activeIconColor$pressed,

    [listItemTokens.stateLayerOpacity$hover]: tokens.stateLayerOpacity$hover,
    [listItemTokens.stateLayerOpacity$pressed]:
      tokens.stateLayerOpacity$pressed,

    [listItemTokens.stateLayerColor$hover]:
      tokens.inactiveStateLayerColor$hover,
    [listItemTokens.stateLayerColor$pressed]:
      tokens.inactiveStateLayerColor$pressed,

    [listItemTokens.selectedStateLayerColor$hover]:
      tokens.activeStateLayerColor$hover,
    [listItemTokens.selectedStateLayerColor$pressed]:
      tokens.activeStateLayerColor$pressed,
  },
});

export const navigationDrawerContentDestinationItemStyles = stylex.create({
  host: {
    [itemTokens.gap]: spacingTokens.padding$3,
    [itemTokens.headlineTextFont]: tokens.labelTextFont,
    [itemTokens.headlineTextLineHeight]: tokens.labelTextLineHeight,
    [itemTokens.headlineTextSize]: tokens.labelTextSize,
    [itemTokens.headlineTextLetterSpacing]: tokens.labelTextLetterSpacing,
    [itemTokens.headlineTextWeight]: tokens.labelTextWeight,

    [itemTokens.trailingSupportingTextColor]: tokens.largeBadgeLabelTextColor,
    [itemTokens.trailingSupportingTextFont]: tokens.largeBadgeLabelTextFont,
    [itemTokens.trailingSupportingTextLineHeight]:
      tokens.largeBadgeLabelTextLineHeight,
    [itemTokens.trailingSupportingTextSize]: tokens.largeBadgeLabelTextSize,
    [itemTokens.trailingSupportingTextLetterSpacing]:
      tokens.largeBadgeLabelTextLetterSpacing,
    [itemTokens.trailingSupportingTextWeight]: tokens.largeBadgeLabelTextWeight,
  },
});
