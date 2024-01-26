import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IDividerStyleKey } from '@/components/atoms/Divider';
import { componentVars as vars } from './Divider.stylex';

type IDividerStyles = IStyles<IDividerStyleKey>;
export const styles: MapNamespaces<IDividerStyles> =
  stylex.create<IDividerStyles>({
    host: {
      boxSizing: 'border-box',
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
      paddingInlineStart: '16px',
      paddingInlineEnd: '16px',
    },
    host$insetStart: {
      paddingInlineStart: '16px',
    },
    host$insetEnd: {
      paddingInlineEnd: '16px',
    },
  });
