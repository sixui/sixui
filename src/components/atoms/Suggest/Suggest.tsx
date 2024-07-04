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
  SuggestBase,
  type ISuggestBaseProps,
} from '@/components/atoms/SuggestBase';

export type ISuggestProps = IOmit<
  ISuggestBaseProps<IFilterableListItem>,
  'itemRenderer' | 'itemLabel'
>;

export const Suggest: React.FC<ISuggestProps> = (props) => (
  <SuggestBase<IFilterableListItem>
    itemRenderer={renderFilterableListItem}
    itemLabel={getFilterableListItemLabel}
    itemsEqual={areFilterableListItemsEqual}
    itemPredicate={filterFilterableListItem}
    itemDisabled={isFilterableListItemDisabled}
    {...props}
    getValueFieldProps={(renderProps, selectedItem) => ({
      leadingIcon: renderProps.isOpen ? undefined : selectedItem?.icon,
      ...props.getValueFieldProps?.(renderProps, selectedItem),
    })}
  />
);
