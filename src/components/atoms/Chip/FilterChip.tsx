import type { IFilterChipProps } from './FilterChipProps';
import { Chip } from './Chip';

export const FilterChip: React.FC<IFilterChipProps> = (props) => (
  <Chip {...props} variant='filter' />
);
