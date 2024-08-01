import { FilterChip, type IFilterChipProps } from '~/components/Chip';

export type IFilterChipPlaygroundDemoProps = {
  filterChip: IFilterChipProps;
};

export const FilterChipPlaygroundDemo: React.FC<
  IFilterChipPlaygroundDemoProps
> = (props) => <FilterChip {...props.filterChip} />;
