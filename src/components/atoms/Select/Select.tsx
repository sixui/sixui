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
  SelectBase,
  type ISelectBaseProps,
} from '@/components/atoms/SelectBase';

export type ISelectProps = IOmit<
  ISelectBaseProps<IFilterableListItem>,
  'itemRenderer' | 'itemLabel'
>;

export const Select: React.FC<ISelectProps> = (props) => (
  <SelectBase<IFilterableListItem>
    itemRenderer={renderFilterableListItem}
    itemLabel={getFilterableListItemLabel}
    itemsEqual={areFilterableListItemsEqual}
    itemPredicate={filterFilterableListItem}
    itemDisabled={isFilterableListItemDisabled}
    getValueFieldProps={(_renderProps, selectedItem) => ({
      leadingIcon: selectedItem?.icon,
    })}
    {...props}
  />
);
