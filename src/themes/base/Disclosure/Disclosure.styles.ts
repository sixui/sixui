import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IDisclosureStyleKey } from '@/components/atoms/Disclosure';
import { componentVars as vars } from './Disclosure.stylex';
import { componentVars as listItemVars } from '../ListItem/ListItem.stylex';

type IDisclosureStyles = IStyles<IDisclosureStyleKey>;
export const styles: MapNamespaces<IDisclosureStyles> =
  stylex.create<IDisclosureStyles>({
    host: {
      display: 'flex',
      flexDirection: 'column',
    },
    button: {
      flexGrow: 1,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.containerShape]: vars.buttonContainerShape,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.containerColor]: vars.buttonContainerColor,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.textColor]: vars.buttonTextColor,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.leadingIconColor]: vars.buttonIconColor,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemVars.trailingIconColor]: vars.buttonIconColor,
    },
    panel: {
      paddingTop: 8,
      paddingLeft: listItemVars.leadingSpace,
      color: vars.panelTextColor,
    },
  });
