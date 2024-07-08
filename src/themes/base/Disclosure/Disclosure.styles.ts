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
      flexGrow: 1,
    },
    panel: {
      color: vars.textColor,
      marginTop: '1rem',
      paddingLeft: listItemVars.leadingSpace,
    },
  });
