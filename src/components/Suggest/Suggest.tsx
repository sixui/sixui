import { forwardRef } from 'react';

import type { ISuggestProps } from './Suggest.types';
import {
  areFilterableListItemsEqual,
  filterFilterableList,
  filterFilterableListItem,
  getFilterableListItemLabel,
  isFilterableListItemDisabled,
  isFilterableListItemEmpty,
  renderFilterableListItem,
  type IFilterableListItem,
} from '@/components/FilterableList';
import { SuggestBase } from '@/components/SuggestBase';
import { ListItem } from '@/components/ListItem';
import { useSelect } from '@/components/Select/useSelect';

export const Suggest = forwardRef<HTMLInputElement, ISuggestProps>(
  function Suggest(props, fowardedRef) {
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
      <SuggestBase<IFilterableListItem>
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
          leadingIcon:
            renderProps.hasFocus && renderProps.query
              ? undefined
              : selectedItem?.icon,
          ...getValueFieldProps?.(renderProps, selectedItem),
        })}
        defaultItem={defaultItem}
        selectedItem={selectedItem}
        onItemChange={(item) => onChange?.(item?.value)}
        ref={fowardedRef}
      />
    );
  },
);
