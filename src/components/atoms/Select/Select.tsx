import type { IOmit } from '@/helpers/types';
import { forwardRef, useMemo, useRef } from 'react';
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
  'itemRenderer' | 'itemLabel' | 'defaultItem' | 'selectedItem' | 'onItemChange'
> & {
  value?: string;
  defaultValue?: string;
  onChange?: (value?: string) => void;
};

export const Select = forwardRef<HTMLDivElement, ISelectProps>(
  function Select(props, fowardedRef) {
    const { getValueFieldProps, value, defaultValue, onChange, ...other } =
      props;
    const defaultItemRef = useRef(
      other.items.find((item) => item.value === defaultValue) ?? undefined,
    );
    const selectedItem = useMemo(
      () =>
        value !== undefined
          ? other.items.find((item) => item.value === value) ?? undefined
          : undefined,
      [other.items, value],
    );

    return (
      <SelectBase<IFilterableListItem>
        itemsEqual={areFilterableListItemsEqual}
        itemPredicate={filterFilterableListItem}
        itemDisabled={isFilterableListItemDisabled}
        {...other}
        itemRenderer={renderFilterableListItem}
        itemLabel={getFilterableListItemLabel}
        getValueFieldProps={(renderProps, selectedItem) => ({
          leadingIcon: selectedItem?.icon,
          ...getValueFieldProps?.(renderProps, selectedItem),
        })}
        defaultItem={defaultItemRef.current}
        selectedItem={selectedItem}
        onItemChange={(item) => onChange?.(item?.value)}
        ref={fowardedRef}
      />
    );
  },
);
