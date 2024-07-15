import type { StyleXStyles } from '@stylexjs/stylex';

import type { IChipVariant } from '../Chip.types';
import { assistChipStyles } from './AssistChip.styles';
import { filterChipStyles } from './FilterChip.styles';
import { inputChipStyles } from './InputChip.styles';
import { suggestionChipStyles } from './SuggestionChip.styles';

export const chipVariantStyles: {
  [key in IChipVariant]: Record<string, StyleXStyles>;
} = {
  assist: assistChipStyles,
  filter: filterChipStyles,
  input: inputChipStyles,
  suggestion: suggestionChipStyles,
};
