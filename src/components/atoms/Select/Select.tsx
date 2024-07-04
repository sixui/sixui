import type { IOmit } from '@/helpers/types';
import { forwardRef } from 'react';
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

export const Select = forwardRef<HTMLDivElement, ISelectProps>(
  function Select(props, fowardedRef) {
    return (
      <SelectBase<IFilterableListItem>
        itemRenderer={renderFilterableListItem}
        itemLabel={getFilterableListItemLabel}
        itemsEqual={areFilterableListItemsEqual}
        itemPredicate={filterFilterableListItem}
        itemDisabled={isFilterableListItemDisabled}
        {...props}
        getValueFieldProps={(_renderProps, selectedItem) => ({
          leadingIcon: selectedItem?.icon,
          ...props.getValueFieldProps?.(_renderProps, selectedItem),
        })}
        ref={fowardedRef}
      />
    );
  },
);
