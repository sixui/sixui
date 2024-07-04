import type { IOmit } from '@/helpers/types';
import {
  areFilterableListItemsEqual,
  filterFilterableListItem,
  getFilterableListItemLabel,
  isFilterableListItemDisabled,
  renderFilterableListItem,
  type IFilterableListItem,
} from '@/components/atoms/FilterableList';
import {
  MultiSelectBase,
  type IMultiSelectBaseProps,
} from '@/components/atoms/MultiSelectBase';

export type IMultiSelectProps = IOmit<
  IMultiSelectBaseProps<IFilterableListItem>,
  'itemRenderer' | 'itemLabel'
>;

export const MultiSelect: React.FC<IMultiSelectProps> = (props) => (
  <MultiSelectBase<IFilterableListItem>
    itemRenderer={renderFilterableListItem}
    itemLabel={getFilterableListItemLabel}
    itemsEqual={areFilterableListItemsEqual}
    itemPredicate={filterFilterableListItem}
    itemDisabled={isFilterableListItemDisabled}
    {...props}
    getValueFieldProps={(_renderProps, item) => ({
      icon: item.icon,
      imageUrl: item.imageUrl,
      ...props.getValueFieldProps?.(_renderProps, item),
    })}
  />
);
