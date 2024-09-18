import { forwardRef } from 'react';

import type { IFilterableListItem } from '../FilterableList';
import type { IMultiSelectProps } from './MultiSelect.types';
import {
  areFilterableListItemsEqual,
  filterFilterableList,
  getFilterableListItemLabel,
  isFilterableListItemDisabled,
  renderFilterableListItem,
} from '../FilterableList';
import { ListItem } from '../ListItem';
import { MultiSelectBase } from '../MultiSelectBase';
import { useMultiSelect } from './useMultiSelect';

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
