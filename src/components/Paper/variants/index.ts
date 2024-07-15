import type { StyleXStyles } from '@stylexjs/stylex';

import type { IPaperVariant } from '../Paper.types';
import { filledPaperStyles } from './FilledPaper.styles';
import { outlinedPaperStyles } from './OutlinedPaper.styles';

export const paperVariantStyles: {
  [key in IPaperVariant]: Record<string, StyleXStyles>;
} = {
  filled: filledPaperStyles,
  outlined: outlinedPaperStyles,
};
