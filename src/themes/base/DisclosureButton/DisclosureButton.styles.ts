import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IDisclosureButtonStyleKey } from '@/components/atoms/DisclosureButton';
import { componentVars as vars } from './DisclosureButton.stylex';
import { componentVars as listItemVars } from '../ListItem/ListItem.stylex';

type IDisclosureButtonStyles = IStyles<IDisclosureButtonStyleKey>;
export const styles: MapNamespaces<IDisclosureButtonStyles> =
  stylex.create<IDisclosureButtonStyles>({
    host: {
      flexGrow: 1,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.containerShape]: vars.containerShape,

      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.containerColor]: vars.containerColor,
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
    host$expanded: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.containerColor]: vars.expandedContainerColor,
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
    icon$expanded: {
      transform: 'rotate(180deg)',
    },
  });
