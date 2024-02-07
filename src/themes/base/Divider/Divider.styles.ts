import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IDividerStyleKey } from '@/components/atoms/Divider';
import { componentVars as vars } from './Divider.stylex';

type IDividerStyles = IStyles<IDividerStyleKey>;
export const styles: MapNamespaces<IDividerStyles> =
  stylex.create<IDividerStyles>({
    host: {
      color: vars.color,
      display: 'flex',
      width: '100%',
      height: vars.thickness,

      '::before': {
        background: 'currentColor',
        content: '',
        width: '100%',
        height: '100%',
      },
    },
    host$inset: {
      paddingInlineStart: 16,
      paddingInlineEnd: 16,
    },
    host$insetStart: {
      paddingInlineStart: 16,
    },
    host$insetEnd: {
      paddingInlineEnd: 16,
    },
  });
