import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ICardMediaStyleKey } from '@/components/atoms/CardMedia';
import { componentVars as vars } from './CardMedia.stylex';

type ICardMediaStyles = IStyles<ICardMediaStyleKey>;
export const styles: MapNamespaces<ICardMediaStyles> =
  stylex.create<ICardMediaStyles>({
    host: {
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: vars.containerShape,
      flexShrink: 0,
    },
    image: {
      position: 'absolute',
      inset: 0,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      borderRadius: 'inherit',
      objectFit: 'cover',
      filter: vars.imageFilter,
    },
    content: {
      zIndex: 1,
    },
  });
