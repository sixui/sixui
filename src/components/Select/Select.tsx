import { forwardRef } from 'react';

import type { ISelectProps } from './Select.types';
import {
  areFilterableListItemsEqual,
  isFilterableListItemEmpty,
  filterFilterableList,
  getFilterableListItemLabel,
  isFilterableListItemDisabled,
  renderFilterableListItem,
  type IFilterableListItem,
  filterFilterableListItem,
} from '~/components/FilterableList';
import { SelectBase } from '~/components/SelectBase';
import { ListItem } from '~/components/ListItem';
import { useSelect } from './useSelect';

export const Select = forwardRef<HTMLDivElement, ISelectProps>(
  function Select(props, fowardedRef) {
    const {
      getValueFieldProps,
      value,
      defaultValue,
      onChange,
      noResultsLabel,
      ...other
    } = props;
    const { defaultItem, selectedItem } = useSelect({
      items: other.items,
      itemEmpty: isFilterableListItemEmpty,
      defaultValue,
      value,
    });

    return (
      <SelectBase<IFilterableListItem>
        itemsEqual={areFilterableListItemsEqual}
        itemEmpty={isFilterableListItemEmpty}
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
        getValueFieldProps={(renderProps, selectedItem) => ({
          leadingIcon: selectedItem?.icon,
          ...getValueFieldProps?.(renderProps, selectedItem),
        })}
        defaultItem={defaultItem}
        selectedItem={selectedItem}
        onItemChange={(item) => onChange?.(item?.value)}
        leadingIcon={selectedItem?.icon}
        ref={fowardedRef}
      />
    );
  },
);
