import type { StyleXStyles } from '@stylexjs/stylex';

import type { IFieldBaseVariant } from '../FieldBase.types';
import { filledFieldBaseStyles } from './FilledFieldBase.styles';
import { outlinedFieldBaseStyles } from './OutlinedFieldBase.styles';

export const fieldBaseVariantStyles: {
  [key in IFieldBaseVariant]: Record<string, StyleXStyles>;
} = {
  filled: filledFieldBaseStyles,
  outlined: outlinedFieldBaseStyles,
};
