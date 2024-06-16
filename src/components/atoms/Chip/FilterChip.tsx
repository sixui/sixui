import type { IOmit } from '@/helpers/types';
import { type IChipProps, Chip } from './Chip';

export type IFilterChipProps = IOmit<
  IChipProps,
  'variant' | 'onDelete' | 'icon' | 'imageUrl' | 'href'
>;

export const FilterChip: React.FC<IFilterChipProps> = (props) => (
  <Chip {...props} variant='filter' />
);
