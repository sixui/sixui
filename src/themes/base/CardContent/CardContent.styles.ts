import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ICardContentStyleKey } from '@/components/atoms/CardContent';

type ICardContentStyles = IStyles<ICardContentStyleKey>;
export const styles: MapNamespaces<ICardContentStyles> =
  stylex.create<ICardContentStyles>({
    host: {
      padding: 16,
    },
  });
