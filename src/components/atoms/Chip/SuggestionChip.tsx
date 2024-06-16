import type { IOmit } from '@/helpers/types';
import { type IChipProps, Chip } from './Chip';

export type ISuggestionChipProps = IOmit<
  IChipProps,
  'variant' | 'icon' | 'imageUrl' | 'onDelete'
>;

export const SuggestionChip: React.FC<ISuggestionChipProps> = (props) => (
  <Chip {...props} variant='suggestion' />
);
