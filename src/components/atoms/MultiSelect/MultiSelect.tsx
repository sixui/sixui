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
  MultiSelectBase,
  type IMultiSelectBaseProps,
} from '@/components/atoms/MultiSelectBase';

export type IMultiSelectProps = IOmit<
  IMultiSelectBaseProps<IFilterableListItem>,
  | 'itemRenderer'
  | 'itemLabel'
  | 'defaultItems'
  | 'selectedItems'
  | 'onItemsChange'
> & {
  values?: Array<string>;
  defaultValues?: Array<string>;
  onChange?: (values?: Array<string>) => void;
};

export const MultiSelect = forwardRef<HTMLInputElement, IMultiSelectProps>(
  function MultiSelect(props, fowardedRef) {
    const { getValueFieldProps, values, defaultValues, onChange, ...other } =
      props;
    const defaultItemsRef = useRef(
      defaultValues
        ? other.items.filter((item) => defaultValues?.includes(item.value))
        : undefined,
    );
    const selectedItems = useMemo(
      () =>
        values
          ? other.items.filter((item) => values?.includes(item.value))
          : undefined,
      [other.items, values],
    );

    return (
      <MultiSelectBase<IFilterableListItem>
        itemsEqual={areFilterableListItemsEqual}
        itemPredicate={filterFilterableListItem}
        itemDisabled={isFilterableListItemDisabled}
        {...other}
        itemRenderer={renderFilterableListItem}
        itemLabel={getFilterableListItemLabel}
        getValueFieldProps={(renderProps, item) => ({
          icon: item.icon,
          imageUrl: item.imageUrl,
          ...getValueFieldProps?.(renderProps, item),
        })}
        defaultItems={defaultItemsRef.current}
        selectedItems={selectedItems}
        onItemsChange={(items) => onChange?.(items.map((item) => item.value))}
        ref={fowardedRef}
      />
    );
  },
);
