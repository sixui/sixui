import stylex from '@stylexjs/stylex';

import { circularProgressIndicatorTokens } from '@/components/atoms/CircularProgressIndicator/CircularProgressIndicator.stylex';
import { componentVars as listItemVars } from '@/themes/base/ListItem/ListItem.stylex';
import { componentVars as itemVars } from '@/themes/base/Item/Item.stylex';
import { motionVars } from '@/themes/base/vars/motion.stylex';
import { disclosureButtonTokens } from './DisclosureButton.stylex';

export type IDisclosureButtonStylesKey = keyof typeof disclosureButtonStyles;
export const disclosureButtonStyles = stylex.create({
  host: {
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
  },
  button: {
    flexGrow: 1,

    [listItemVars.containerShape]: disclosureButtonTokens.containerShape,
    [listItemVars.containerColor]: disclosureButtonTokens.containerColor,
    [listItemVars.containerOpacity]: disclosureButtonTokens.containerOpacity,
    [listItemVars.containerColor$disabled]:
      disclosureButtonTokens.containerColor$disabled,
    [listItemVars.containerOpacity$disabled]:
      disclosureButtonTokens.containerOpacity$disabled,
    [listItemVars.textColor]: disclosureButtonTokens.textColor,
    [listItemVars.textColor$disabled]:
      disclosureButtonTokens.textColor$disabled,
    [listItemVars.textColor$focus]: disclosureButtonTokens.textColor$focus,
    [listItemVars.textColor$hover]: disclosureButtonTokens.textColor$hover,
    [listItemVars.textColor$pressed]: disclosureButtonTokens.textColor$pressed,
    [listItemVars.leadingIconColor]: disclosureButtonTokens.iconColor,
    [listItemVars.leadingIconColor$disabled]:
      disclosureButtonTokens.iconColor$disabled,
    [listItemVars.leadingIconColor$focus]:
      disclosureButtonTokens.iconColor$focus,
    [listItemVars.leadingIconColor$hover]:
      disclosureButtonTokens.iconColor$hover,
    [listItemVars.leadingIconColor$pressed]:
      disclosureButtonTokens.iconColor$pressed,
    [listItemVars.trailingIconColor]: disclosureButtonTokens.iconColor,
    [listItemVars.trailingIconColor$disabled]:
      disclosureButtonTokens.iconColor$disabled,
    [listItemVars.trailingIconColor$focus]:
      disclosureButtonTokens.iconColor$focus,
    [listItemVars.trailingIconColor$hover]:
      disclosureButtonTokens.iconColor$hover,
    [listItemVars.trailingIconColor$pressed]:
      disclosureButtonTokens.iconColor$pressed,
  },
  button$expanded: {
    [listItemVars.containerColor]:
      disclosureButtonTokens.expandedContainerColor,
    [listItemVars.containerOpacity]:
      disclosureButtonTokens.expandedContainerOpacity,
    [listItemVars.containerColor$disabled]:
      disclosureButtonTokens.expandedContainerColor$disabled,
    [listItemVars.containerOpacity$disabled]:
      disclosureButtonTokens.expandedContainerOpacity$disabled,
    [listItemVars.textColor]: disclosureButtonTokens.expandedTextColor,
    [listItemVars.textColor$disabled]:
      disclosureButtonTokens.expandedTextColor$disabled,
    [listItemVars.textColor$focus]:
      disclosureButtonTokens.expandedTextColor$focus,
    [listItemVars.textColor$hover]:
      disclosureButtonTokens.expandedTextColor$hover,
    [listItemVars.textColor$pressed]:
      disclosureButtonTokens.expandedTextColor$pressed,
    [listItemVars.leadingIconColor]: disclosureButtonTokens.expandedIconColor,
    [listItemVars.leadingIconColor$disabled]:
      disclosureButtonTokens.expandedIconColor$disabled,
    [listItemVars.leadingIconColor$focus]:
      disclosureButtonTokens.expandedIconColor$focus,
    [listItemVars.leadingIconColor$hover]:
      disclosureButtonTokens.expandedIconColor$hover,
    [listItemVars.leadingIconColor$pressed]:
      disclosureButtonTokens.expandedIconColor$pressed,
    [listItemVars.trailingIconColor]: disclosureButtonTokens.expandedIconColor,
    [listItemVars.trailingIconColor$disabled]:
      disclosureButtonTokens.expandedIconColor$disabled,
    [listItemVars.trailingIconColor$focus]:
      disclosureButtonTokens.expandedIconColor$focus,
    [listItemVars.trailingIconColor$hover]:
      disclosureButtonTokens.expandedIconColor$hover,
    [listItemVars.trailingIconColor$pressed]:
      disclosureButtonTokens.expandedIconColor$pressed,
  },
  button$checkable: {
    [listItemVars.leadingSpace]: 'calc(16px + 18px + 12px)',
  },
  button$switchable: {
    [listItemVars.leadingSpace]: 'calc(16px + 52px + 16px)',
  },
  button$toggledOff: {
    [listItemVars.containerColor]:
      disclosureButtonTokens.uncheckedContainerColor,
    [listItemVars.containerOpacity]:
      disclosureButtonTokens.uncheckedContainerOpacity,
    [listItemVars.containerColor$disabled]:
      disclosureButtonTokens.uncheckedContainerColor$disabled,
    [listItemVars.containerOpacity$disabled]:
      disclosureButtonTokens.uncheckedContainerOpacity$disabled,
  },
  icon: {
    transform: 'rotate(0)',
  },
  icon$expanded: {
    transform: 'rotate(180deg)',
    transitionProperty: 'transform',
    transitionDuration: motionVars.duration$long2,
    transitionTimingFunction: motionVars.easing$emphasizedDecelerate,
    transformOrigin: 'center',
  },
  icon$collapsed: {
    transitionProperty: 'transform',
    transitionDuration: motionVars.duration$short2,
    transitionTimingFunction: motionVars.easing$emphasizedAccelerate,
    transformOrigin: 'center',
  },
  toggleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    marginLeft: 16,
  },
});

export const disclosureButtonItemStyles = stylex.create({
  headline: {
    [itemVars.headlineTextFont]: disclosureButtonTokens.textFont,
    [itemVars.headlineTextLineHeight]: disclosureButtonTokens.textLineHeight,
    [itemVars.headlineTextSize]: disclosureButtonTokens.textSize,
    [itemVars.headlineTextLetterSpacing]:
      disclosureButtonTokens.textLetterSpacing,
    [itemVars.headlineTextWeight]: disclosureButtonTokens.textWeight,
  },
});

export const disclosureButtonCircularProgressIndicatorStyles = stylex.create({
  host: {
    [circularProgressIndicatorTokens.color]: disclosureButtonTokens.textColor,
  },
});
