import type { IOmit } from '@/helpers/types';
import { forwardRef } from 'react';
import {
  areFilterableListItemsEqual,
  filterFilterableList,
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
import { ListItem } from '@/components/atoms/ListItem';
import { useMultiSelect } from './useMultiSelect';

export type IMultiSelectOwnProps = {
  value?: Array<string>;
  defaultValue?: Array<string>;
  onChange?: (value?: Array<string>) => void;
  noResultsLabel?: string;
};

export type IMultiSelectProps = Omit<
  IOmit<
    IMultiSelectBaseProps<IFilterableListItem>,
    | 'itemRenderer'
    | 'itemLabel'
    | 'defaultItems'
    | 'selectedItems'
    | 'onItemsChange'
  >,
  keyof IMultiSelectOwnProps
> &
  IMultiSelectOwnProps;

export const MultiSelect = forwardRef<HTMLInputElement, IMultiSelectProps>(
  function MultiSelect(props, fowardedRef) {
    const {
      getValueFieldProps,
      value,
      defaultValue,
      onChange,
      noResultsLabel,
      ...other
    } = props;
    const { defaultItems, selectedItems } = useMultiSelect({
      items: other.items,
      defaultValue,
      value,
    });

    return (
      <MultiSelectBase<IFilterableListItem>
        itemsEqual={areFilterableListItemsEqual}
        listPredicate={filterFilterableList}
        itemPredicate={filterFilterableListItem}
        itemDisabled={isFilterableListItemDisabled}
        noResults={
          noResultsLabel ? (
            <ListItem disabled>{noResultsLabel}</ListItem>
          ) : undefined
        }
        {...other}
        itemRenderer={renderFilterableListItem}
        itemLabel={getFilterableListItemLabel}
        getValueFieldProps={(renderProps, item) => ({
          icon: item.icon,
          imageUrl: item.imageUrl,
          ...getValueFieldProps?.(renderProps, item),
        })}
        defaultItems={defaultItems}
        selectedItems={selectedItems}
        onItemsChange={(items) => onChange?.(items.map((item) => item.value))}
        ref={fowardedRef}
      />
    );
  },
);
