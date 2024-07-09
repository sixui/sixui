import type { IOmit } from '@/helpers/types';
import type { IChipProps } from './ChipProps';

export type ISuggestionChipProps = IOmit<
  IChipProps,
  'variant' | 'icon' | 'imageUrl' | 'onDelete'
>;
