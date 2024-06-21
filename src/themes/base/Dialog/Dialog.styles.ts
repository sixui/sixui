import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IDialogStyleKey } from '@/components/atoms/Dialog';

// https://github.com/material-components/material-web/blob/main/dialog/internal/_dialog.scss

type IDialogStyles = IStyles<IDialogStyleKey>;
export const styles: MapNamespaces<IDialogStyles> =
  stylex.create<IDialogStyles>({
    host: {
      // FIXME:
    },
  });
