import type { IOmit } from '~/utils/types';
import type { IChipProps } from './Chip.types';

export type ISuggestionChipProps = IOmit<
  IChipProps,
  'variant' | 'icon' | 'imageUrl' | 'onTrailingClick' | 'avatar' | 'selected'
>;
