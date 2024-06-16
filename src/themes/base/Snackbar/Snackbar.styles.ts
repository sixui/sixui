import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ISnackbarStyleKey } from '@/components/atoms/Snackbar';
import { componentVars as vars } from './Snackbar.stylex';

type ISnackbarStyles = IStyles<ISnackbarStyleKey>;
export const styles: MapNamespaces<ISnackbarStyles> =
  stylex.create<ISnackbarStyles>({
    host: {
      maxWidth: `calc(100% - ${vars.fixedHorizontalSpace} * 2)`,
    },
    host$left: {
      position: 'fixed',
      left: vars.fixedHorizontalSpace,
      bottom: vars.fixedBottomSpace,
    },
    host$center: {
      position: 'fixed',
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: vars.fixedBottomSpace,
    },
  });
