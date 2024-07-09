import type { ISuggestionChipProps } from './SuggestionChipProps';
import { Chip } from './Chip';

export const SuggestionChip: React.FC<ISuggestionChipProps> = (props) => (
  <Chip {...props} variant='suggestion' />
);
