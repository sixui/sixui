import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IDisclosureButtonStyleKey } from '@/components/atoms/DisclosureButton';
import type { IItemStyleKey } from '@/components/atoms/Item';
import type { ICircularProgressIndicatorStyleKey } from '@/components/atoms/CircularProgressIndicator';
import { componentVars as vars } from './DisclosureButton.stylex';
import { componentVars as listItemVars } from '../ListItem/ListItem.stylex';
import { componentVars as itemVars } from '../Item/Item.stylex';
import { componentVars as circularProgressIndicatorVars } from '../CircularProgressIndicator/CircularProgressIndicator.stylex';

type IDisclosureButtonStyles = IStyles<IDisclosureButtonStyleKey>;
export const styles: MapNamespaces<IDisclosureButtonStyles> =
  stylex.create<IDisclosureButtonStyles>({
    host: {
      position: 'relative',
      display: 'flex',
    },
    button: {
      flexGrow: 1,

      [listItemVars.containerShape]: vars.containerShape,
      [listItemVars.containerColor]: vars.containerColor,
      [listItemVars.containerOpacity]: vars.containerOpacity,
      [listItemVars.containerColor$disabled]: vars.containerColor$disabled,
      [listItemVars.containerOpacity$disabled]: vars.containerOpacity$disabled,
      [listItemVars.textColor]: vars.textColor,
      [listItemVars.textColor$disabled]: vars.textColor$disabled,
      [listItemVars.textColor$focus]: vars.textColor$focus,
      [listItemVars.textColor$hover]: vars.textColor$hover,
      [listItemVars.textColor$pressed]: vars.textColor$pressed,
      [listItemVars.leadingIconColor]: vars.iconColor,
      [listItemVars.leadingIconColor$disabled]: vars.iconColor$disabled,
      [listItemVars.leadingIconColor$focus]: vars.iconColor$focus,
      [listItemVars.leadingIconColor$hover]: vars.iconColor$hover,
      [listItemVars.leadingIconColor$pressed]: vars.iconColor$pressed,
      [listItemVars.trailingIconColor]: vars.iconColor,
      [listItemVars.trailingIconColor$disabled]: vars.iconColor$disabled,
      [listItemVars.trailingIconColor$focus]: vars.iconColor$focus,
      [listItemVars.trailingIconColor$hover]: vars.iconColor$hover,
      [listItemVars.trailingIconColor$pressed]: vars.iconColor$pressed,
    },
    button$expanded: {
      [listItemVars.containerColor]: vars.expandedContainerColor,
      [listItemVars.containerOpacity]: vars.expandedContainerOpacity,
      [listItemVars.containerColor$disabled]:
        vars.expandedContainerColor$disabled,
      [listItemVars.containerOpacity$disabled]:
        vars.expandedContainerOpacity$disabled,
      [listItemVars.textColor]: vars.expandedTextColor,
      [listItemVars.textColor$disabled]: vars.expandedTextColor$disabled,
      [listItemVars.textColor$focus]: vars.expandedTextColor$focus,
      [listItemVars.textColor$hover]: vars.expandedTextColor$hover,
      [listItemVars.textColor$pressed]: vars.expandedTextColor$pressed,
      [listItemVars.leadingIconColor]: vars.expandedIconColor,
      [listItemVars.leadingIconColor$disabled]: vars.expandedIconColor$disabled,
      [listItemVars.leadingIconColor$focus]: vars.expandedIconColor$focus,
      [listItemVars.leadingIconColor$hover]: vars.expandedIconColor$hover,
      [listItemVars.leadingIconColor$pressed]: vars.expandedIconColor$pressed,
      [listItemVars.trailingIconColor]: vars.expandedIconColor,
      [listItemVars.trailingIconColor$disabled]:
        vars.expandedIconColor$disabled,
      [listItemVars.trailingIconColor$focus]: vars.expandedIconColor$focus,
      [listItemVars.trailingIconColor$hover]: vars.expandedIconColor$hover,
      [listItemVars.trailingIconColor$pressed]: vars.expandedIconColor$pressed,
    },
    button$checkable: {
      [listItemVars.leadingSpace]: 'calc(16px + 18px + 12px)',
    },
    button$checkable$switch: {
      [listItemVars.leadingSpace]: 'calc(16px + 52px + 16px)',
    },
    button$unchecked: {
      [listItemVars.containerColor]: vars.uncheckedContainerColor,
      [listItemVars.containerOpacity]: vars.uncheckedContainerOpacity,
      [listItemVars.containerColor$disabled]:
        vars.uncheckedContainerColor$disabled,
      [listItemVars.containerOpacity$disabled]:
        vars.uncheckedContainerOpacity$disabled,
    },
    icon$expanded: {
      transform: 'rotate(180deg)',
    },
    checkboxContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      marginLeft: 16,
    },
  });

type IItemStyles = IStyles<IItemStyleKey>;
export const itemStyles: MapNamespaces<IItemStyles> = stylex.create<
  IStyles<IItemStyleKey>
>({
  label: {
    [itemVars.labelTextFont]: vars.textFont,
    [itemVars.labelTextLineHeight]: vars.textLineHeight,
    [itemVars.labelTextSize]: vars.textSize,
    [itemVars.labelTextLetterSpacing]: vars.textLetterSpacing,
    [itemVars.labelTextWeight]: vars.textWeight,
  },
});

type ICircularProgressIndicatorStyles =
  IStyles<ICircularProgressIndicatorStyleKey>;
export const circularProgressIndicatorStyles: MapNamespaces<ICircularProgressIndicatorStyles> =
  stylex.create<ICircularProgressIndicatorStyles>({
    host: {
      [circularProgressIndicatorVars.color]: vars.textColor,
    },
  });
