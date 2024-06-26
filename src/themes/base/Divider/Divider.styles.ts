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
    line: {
      display: 'flex',
      flexGrow: 1,
      color: 'inherit',

      '::before': {
        background: 'currentColor',
        content: '',
        width: '100%',
        height: '100%',
        borderRadius: vars.shape,
      },
    },
    line$inset: {
      paddingInlineStart: 16,
      paddingInlineEnd: 16,
    },
    line$insetStart: {
      paddingInlineStart: 16,
    },
    line$insetEnd: {
      paddingInlineEnd: 16,
    },
    text: {
      textAlign: 'center',
      marginInlineStart: 8,
      marginInlineEnd: 8,

      color: vars.textColor,
      fontFamily: vars.textFont,
      fontSize: vars.textSize,
      fontWeight: vars.textWeight,
      lineHeight: vars.textLineHeight,
      letterSpacing: vars.textLetterSpacing,
    },
  });
