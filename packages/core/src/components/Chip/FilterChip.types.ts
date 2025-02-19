import type { IOmit } from '~/utils/types';
import type { IChipProps } from './Chip.types';

export type IFilterChipProps = IOmit<
  IChipProps,
  'variant' | 'onTrailingClick' | 'icon' | 'imageUrl' | 'href' | 'avatar'
>;
