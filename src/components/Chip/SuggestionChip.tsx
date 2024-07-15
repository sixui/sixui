import type { ISuggestionChipProps } from './SuggestionChip.types';
import { Chip } from './Chip';

export const SuggestionChip: React.FC<ISuggestionChipProps> = (props) => (
  <Chip {...props} variant='suggestion' />
);
