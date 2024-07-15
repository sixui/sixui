import type { IOmit } from '@/helpers/types';
import type { IChipProps } from './Chip.types';

export type ISuggestionChipProps = IOmit<
  IChipProps,
  'variant' | 'icon' | 'imageUrl' | 'onDelete'
>;
