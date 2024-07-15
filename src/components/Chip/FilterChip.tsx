import type { IFilterChipProps } from './FilterChip.types';
import { Chip } from './Chip';

export const FilterChip: React.FC<IFilterChipProps> = (props) => (
  <Chip {...props} variant='filter' />
);
