import type { StyleXStyles } from '@stylexjs/stylex';

import type { IButtonVariant } from '../Button.types';
import { elevatedButtonStyles } from './ElevatedButton.styles';
import { filledButtonStyles } from './FilledButton.styles';
import { filledTonalButtonStyles } from './FilledTonalButton.styles';
import { outlinedButtonStyles } from './OutlinedButton.styles';
import { textButtonStyles } from './TextButton.styles';
import { dangerButtonStyles } from './DangerButton.styles';
import { snackbarButtonStyles } from './SnackbarButton.styles';

export const buttonVariants: {
  [key in IButtonVariant]: Record<string, StyleXStyles>;
} = {
  elevated: elevatedButtonStyles,
  filled: filledButtonStyles,
  filledTonal: filledTonalButtonStyles,
  outlined: outlinedButtonStyles,
  text: textButtonStyles,
  danger: dangerButtonStyles,
  snackbar: snackbarButtonStyles,
};
