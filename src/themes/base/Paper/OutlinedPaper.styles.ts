import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IPaperStyleKey } from '@/components/atoms/Paper';
import { componentVars as vars } from './Paper.stylex';

// https://github.com/material-components/material-web/blob/main/labs/Paper/internal/_outlined-Paper.scss
type IOutlinedPaperStyles = IStyles<IPaperStyleKey>;
export const styles: MapNamespaces<IOutlinedPaperStyles> =
  stylex.create<IOutlinedPaperStyles>({
    outline: {
      inset: 0,
      pointerEvents: 'none',
      borderStyle: 'solid',
      borderWidth: vars.outlineWidth,
      position: 'absolute',
      borderColor: vars.outlineColor,
      borderRadius: 'inherit',
    },
  });
