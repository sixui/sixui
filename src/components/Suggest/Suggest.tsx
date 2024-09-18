import { forwardRef } from 'react';

import type { IFilterableListItem } from '../FilterableList';
import type { ISuggestProps } from './Suggest.types';
import {
  areFilterableListItemsEqual,
  filterFilterableList,
  getFilterableListItemLabel,
  isFilterableListItemDisabled,
  isFilterableListItemEmpty,
  renderFilterableListItem,
} from '../FilterableList';
import { ListItem } from '../ListItem';
import { useSelect } from '../Select/useSelect';
import { SuggestBase } from '../SuggestBase';

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
