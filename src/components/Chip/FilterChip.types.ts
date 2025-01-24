import type { IOmit } from '~/helpers/types';
import type { IChipProps } from './Chip.types';

export type IFilterChipProps = IOmit<
  IChipProps,
  'variant' | 'onTrailingClick' | 'icon' | 'imageUrl' | 'href' | 'avatar'
>;
