import type { StyleXStyles } from '@stylexjs/stylex';

import type { ICardVariant } from '../Card.types';
import { elevatedCardStyles } from './ElevatedCard.styles';
import { filledCardStyles } from './FilledCard.styles';
import { outlinedCardStyles } from './OutlinedCard.styles';

export const cardVariantStyles: {
  [key in ICardVariant]: Record<string, StyleXStyles>;
} = {
  elevated: elevatedCardStyles,
  filled: filledCardStyles,
  outlined: outlinedCardStyles,
};
