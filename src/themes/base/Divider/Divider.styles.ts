import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IDividerStyleKey } from '@/components/atoms/Divider';
import { componentVars as vars } from './Divider.stylex';

type IDividerStyles = IStyles<IDividerStyleKey>;
export const styles: MapNamespaces<IDividerStyles> =
  stylex.create<IDividerStyles>({
    host: {
      display: 'flex',
      width: '100%',
      height: vars.thickness,
      color: vars.color,
    },
    separator: {
      display: 'flex',
      flexGrow: 1,
      color: 'inherit',

      '::before': {
        background: 'currentColor',
        content: '',
        width: '100%',
        height: '100%',
      },
    },
    separator$inset: {
      paddingInlineStart: 16,
      paddingInlineEnd: 16,
    },
    separator$insetStart: {
      paddingInlineStart: 16,
    },
    separator$insetEnd: {
      paddingInlineEnd: 16,
    },
    text: {
      display: 'flex',
      alignItems: 'center',
      marginInlineStart: 8,
      marginInlineEnd: 8,
      color: vars.textColor,
    },
  });
