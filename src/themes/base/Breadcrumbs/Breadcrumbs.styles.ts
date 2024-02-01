import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IBreadcrumbsStyleKey } from '@/components/atoms/Breadcrumbs';
import { componentVars as vars } from './Breadcrumbs.stylex';

type IBreadcrumbsStyles = IStyles<IBreadcrumbsStyleKey>;
export const styles: MapNamespaces<IBreadcrumbsStyles> =
  stylex.create<IBreadcrumbsStyles>({
    host: {},
    list: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      padding: 0,
      margin: 0,
      listStyle: 'none',
    },
    item: {
      color: vars.itemColor,
      fontFamily: vars.itemTextFont,
      fontSize: vars.itemTextSize,
      fontWeight: vars.itemTextWeight,
      lineHeight: vars.itemTextLineHeight,
      letterSpacing: vars.itemTextLetterSpacing,
    },
    separator: {
      color: vars.separatorColor,
      display: 'flex',
      userSelect: 'none',
      marginLeft: 8,
      marginRight: 8,
    },
    collapsedButton: {
      display: 'flex',
      borderStyle: 'unset',
      outline: 'none',
      marginLeft: 8, // TODO
      marginRight: 8, // TODO
      color: 'red', // TODO
      cursor: 'pointer',
      backgroundColor: {
        // TODO
        default: 'lightgray',
        ':focus': 'green',
        ':hover': 'red',
        ':active': 'violet',
      },
      borderRadius: 2, // TODO
      width: 24,
      height: 16,
    },
  });
