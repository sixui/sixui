import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ICardActionsStyleKey } from '@/components/atoms/CardActions';

type ICardActionsStyles = IStyles<ICardActionsStyleKey>;
export const styles: MapNamespaces<ICardActionsStyles> =
  stylex.create<ICardActionsStyles>({
    host: {
      display: 'flex',
      flexDirection: 'row',
      padding: 16,
      gap: 8,
    },
  });
