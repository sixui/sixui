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

      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.containerShape]: vars.containerShape,

      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.containerColor]: vars.containerColor,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.containerOpacity]: vars.containerOpacity,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.containerColor$disabled]: vars.containerColor$disabled,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.containerOpacity$disabled]: vars.containerOpacity$disabled,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.textColor]: vars.textColor,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.textColor$disabled]: vars.textColor$disabled,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.textColor$focus]: vars.textColor$focus,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.textColor$hover]: vars.textColor$hover,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.textColor$pressed]: vars.textColor$pressed,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.leadingIconColor]: vars.iconColor,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.leadingIconColor$disabled]: vars.iconColor$disabled,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.leadingIconColor$focus]: vars.iconColor$focus,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.leadingIconColor$hover]: vars.iconColor$hover,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.leadingIconColor$pressed]: vars.iconColor$pressed,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.trailingIconColor]: vars.iconColor,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.trailingIconColor$disabled]: vars.iconColor$disabled,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.trailingIconColor$focus]: vars.iconColor$focus,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.trailingIconColor$hover]: vars.iconColor$hover,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.trailingIconColor$pressed]: vars.iconColor$pressed,
    },
    button$expanded: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.containerColor]: vars.expandedContainerColor,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.containerOpacity]: vars.expandedContainerOpacity,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.containerColor$disabled]:
        vars.expandedContainerColor$disabled,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.containerOpacity$disabled]:
        vars.expandedContainerOpacity$disabled,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.textColor]: vars.expandedTextColor,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.textColor$disabled]: vars.expandedTextColor$disabled,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.textColor$focus]: vars.expandedTextColor$focus,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.textColor$hover]: vars.expandedTextColor$hover,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.textColor$pressed]: vars.expandedTextColor$pressed,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.leadingIconColor]: vars.expandedIconColor,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.leadingIconColor$disabled]: vars.expandedIconColor$disabled,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.leadingIconColor$focus]: vars.expandedIconColor$focus,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.leadingIconColor$hover]: vars.expandedIconColor$hover,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.leadingIconColor$pressed]: vars.expandedIconColor$pressed,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.trailingIconColor]: vars.expandedIconColor,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.trailingIconColor$disabled]:
        vars.expandedIconColor$disabled,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.trailingIconColor$focus]: vars.expandedIconColor$focus,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.trailingIconColor$hover]: vars.expandedIconColor$hover,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.trailingIconColor$pressed]: vars.expandedIconColor$pressed,
    },
    button$checkable: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.leadingSpace]: 'calc(16px + 18px + 12px)',
    },
    button$checkable$switch: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.leadingSpace]: 'calc(16px + 52px + 16px)',
    },
    button$unchecked: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.containerColor]: vars.uncheckedContainerColor,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.containerOpacity]: vars.uncheckedContainerOpacity,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.containerColor$disabled]:
        vars.uncheckedContainerColor$disabled,
      // eslint-disable-next-line @stylexjs/valid-styles
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
    // eslint-disable-next-line @stylexjs/valid-styles
    [itemVars.labelTextFont]: vars.textFont,
    // eslint-disable-next-line @stylexjs/valid-styles
    [itemVars.labelTextLineHeight]: vars.textLineHeight,
    // eslint-disable-next-line @stylexjs/valid-styles
    [itemVars.labelTextSize]: vars.textSize,
    // eslint-disable-next-line @stylexjs/valid-styles
    [itemVars.labelTextLetterSpacing]: vars.textLetterSpacing,
    // eslint-disable-next-line @stylexjs/valid-styles
    [itemVars.labelTextWeight]: vars.textWeight,
  },
});

type ICircularProgressIndicatorStyles =
  IStyles<ICircularProgressIndicatorStyleKey>;
export const circularProgressIndicatorStyles: MapNamespaces<ICircularProgressIndicatorStyles> =
  stylex.create<ICircularProgressIndicatorStyles>({
    host: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [circularProgressIndicatorVars.color]: vars.textColor,
    },
  });
