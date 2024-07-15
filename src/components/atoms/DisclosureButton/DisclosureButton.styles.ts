import stylex from '@stylexjs/stylex';

import { circularProgressIndicatorTokens } from '@/components/atoms/CircularProgressIndicator/CircularProgressIndicator.stylex';
import { listItemTokens } from '@/components/atoms/ListItem/ListItem.stylex';
import { itemTokens } from '@/components/atoms/Item/Item.stylex';
import { motionTokens } from '@/themes/base/tokens/motion.stylex';
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

    [listItemTokens.containerShape]: disclosureButtonTokens.containerShape,
    [listItemTokens.containerColor]: disclosureButtonTokens.containerColor,
    [listItemTokens.containerOpacity]: disclosureButtonTokens.containerOpacity,
    [listItemTokens.containerColor$disabled]:
      disclosureButtonTokens.containerColor$disabled,
    [listItemTokens.containerOpacity$disabled]:
      disclosureButtonTokens.containerOpacity$disabled,
    [listItemTokens.textColor]: disclosureButtonTokens.textColor,
    [listItemTokens.textColor$disabled]:
      disclosureButtonTokens.textColor$disabled,
    [listItemTokens.textColor$focus]: disclosureButtonTokens.textColor$focus,
    [listItemTokens.textColor$hover]: disclosureButtonTokens.textColor$hover,
    [listItemTokens.textColor$pressed]:
      disclosureButtonTokens.textColor$pressed,
    [listItemTokens.leadingIconColor]: disclosureButtonTokens.iconColor,
    [listItemTokens.leadingIconColor$disabled]:
      disclosureButtonTokens.iconColor$disabled,
    [listItemTokens.leadingIconColor$focus]:
      disclosureButtonTokens.iconColor$focus,
    [listItemTokens.leadingIconColor$hover]:
      disclosureButtonTokens.iconColor$hover,
    [listItemTokens.leadingIconColor$pressed]:
      disclosureButtonTokens.iconColor$pressed,
    [listItemTokens.trailingIconColor]: disclosureButtonTokens.iconColor,
    [listItemTokens.trailingIconColor$disabled]:
      disclosureButtonTokens.iconColor$disabled,
    [listItemTokens.trailingIconColor$focus]:
      disclosureButtonTokens.iconColor$focus,
    [listItemTokens.trailingIconColor$hover]:
      disclosureButtonTokens.iconColor$hover,
    [listItemTokens.trailingIconColor$pressed]:
      disclosureButtonTokens.iconColor$pressed,
  },
  button$expanded: {
    [listItemTokens.containerColor]:
      disclosureButtonTokens.expandedContainerColor,
    [listItemTokens.containerOpacity]:
      disclosureButtonTokens.expandedContainerOpacity,
    [listItemTokens.containerColor$disabled]:
      disclosureButtonTokens.expandedContainerColor$disabled,
    [listItemTokens.containerOpacity$disabled]:
      disclosureButtonTokens.expandedContainerOpacity$disabled,
    [listItemTokens.textColor]: disclosureButtonTokens.expandedTextColor,
    [listItemTokens.textColor$disabled]:
      disclosureButtonTokens.expandedTextColor$disabled,
    [listItemTokens.textColor$focus]:
      disclosureButtonTokens.expandedTextColor$focus,
    [listItemTokens.textColor$hover]:
      disclosureButtonTokens.expandedTextColor$hover,
    [listItemTokens.textColor$pressed]:
      disclosureButtonTokens.expandedTextColor$pressed,
    [listItemTokens.leadingIconColor]: disclosureButtonTokens.expandedIconColor,
    [listItemTokens.leadingIconColor$disabled]:
      disclosureButtonTokens.expandedIconColor$disabled,
    [listItemTokens.leadingIconColor$focus]:
      disclosureButtonTokens.expandedIconColor$focus,
    [listItemTokens.leadingIconColor$hover]:
      disclosureButtonTokens.expandedIconColor$hover,
    [listItemTokens.leadingIconColor$pressed]:
      disclosureButtonTokens.expandedIconColor$pressed,
    [listItemTokens.trailingIconColor]:
      disclosureButtonTokens.expandedIconColor,
    [listItemTokens.trailingIconColor$disabled]:
      disclosureButtonTokens.expandedIconColor$disabled,
    [listItemTokens.trailingIconColor$focus]:
      disclosureButtonTokens.expandedIconColor$focus,
    [listItemTokens.trailingIconColor$hover]:
      disclosureButtonTokens.expandedIconColor$hover,
    [listItemTokens.trailingIconColor$pressed]:
      disclosureButtonTokens.expandedIconColor$pressed,
  },
  button$checkable: {
    [listItemTokens.leadingSpace]: 'calc(16px + 18px + 12px)',
  },
  button$switchable: {
    [listItemTokens.leadingSpace]: 'calc(16px + 52px + 16px)',
  },
  button$toggledOff: {
    [listItemTokens.containerColor]:
      disclosureButtonTokens.uncheckedContainerColor,
    [listItemTokens.containerOpacity]:
      disclosureButtonTokens.uncheckedContainerOpacity,
    [listItemTokens.containerColor$disabled]:
      disclosureButtonTokens.uncheckedContainerColor$disabled,
    [listItemTokens.containerOpacity$disabled]:
      disclosureButtonTokens.uncheckedContainerOpacity$disabled,
  },
  icon: {
    transform: 'rotate(0)',
  },
  icon$expanded: {
    transform: 'rotate(180deg)',
    transitionProperty: 'transform',
    transitionDuration: motionTokens.duration$long2,
    transitionTimingFunction: motionTokens.easing$emphasizedDecelerate,
    transformOrigin: 'center',
  },
  icon$collapsed: {
    transitionProperty: 'transform',
    transitionDuration: motionTokens.duration$short2,
    transitionTimingFunction: motionTokens.easing$emphasizedAccelerate,
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
    [itemTokens.headlineTextFont]: disclosureButtonTokens.textFont,
    [itemTokens.headlineTextLineHeight]: disclosureButtonTokens.textLineHeight,
    [itemTokens.headlineTextSize]: disclosureButtonTokens.textSize,
    [itemTokens.headlineTextLetterSpacing]:
      disclosureButtonTokens.textLetterSpacing,
    [itemTokens.headlineTextWeight]: disclosureButtonTokens.textWeight,
  },
});

export const disclosureButtonCircularProgressIndicatorStyles = stylex.create({
  host: {
    [circularProgressIndicatorTokens.color]: disclosureButtonTokens.textColor,
  },
});
