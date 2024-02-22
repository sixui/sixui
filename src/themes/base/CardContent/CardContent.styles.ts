import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ICardContentStyleKey } from '@/components/atoms/CardContent';
import { componentVars as vars } from './CardContent.stylex';

type ICardContentStyles = IStyles<ICardContentStyleKey>;
export const styles: MapNamespaces<ICardContentStyles> =
  stylex.create<ICardContentStyles>({
    host: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,

      marginTop: vars.topSpace,
      marginBottom: vars.bottomSpace,
      paddingLeft: vars.leadingSpace,
      paddingRight: vars.trailingSpace,
    },
    host$actionable: {
      marginTop: vars.topSpace$actionable,
      marginBottom: vars.bottomSpace$actionable,
      paddingLeft: vars.leadingSpace$actionable,
      paddingRight: vars.trailingSpace$actionable,
    },
  });
