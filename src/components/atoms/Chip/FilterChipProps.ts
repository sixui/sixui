import type { IOmit } from '@/helpers/types';
import type { IChipProps } from './ChipProps';

export type IFilterChipProps = IOmit<
  IChipProps,
  'variant' | 'onDelete' | 'icon' | 'imageUrl' | 'href'
>;
