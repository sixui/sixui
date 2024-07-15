import type { StyleXStyles } from '@stylexjs/stylex';

import type { IIconButtonVariant } from '../IconButton.types';
import { dangerIconButtonStyles } from './DangerIconButton.styles';
import { filledIconButtonStyles } from './FilledIconButton.styles';
import { filledTonalIconButtonStyles } from './FilledTonalIconButton.styles';
import { outlinedIconButtonStyles } from './OutlinedIconButton.styles';
import { snackbarIconButtonStyles } from './SnackbarIconButton.styles';
import { standardIconButtonStyles } from './StandardIconButton.styles';

export const iconButtonVariantStyles: {
  [key in IIconButtonVariant]: Record<string, StyleXStyles>;
} = {
  danger: dangerIconButtonStyles,
  filled: filledIconButtonStyles,
  filledTonal: filledTonalIconButtonStyles,
  outlined: outlinedIconButtonStyles,
  snackbar: snackbarIconButtonStyles,
  standard: standardIconButtonStyles,
};
