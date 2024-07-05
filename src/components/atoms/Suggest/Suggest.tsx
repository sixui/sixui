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
  SuggestBase,
  type ISuggestBaseProps,
} from '@/components/atoms/SuggestBase';

export type ISuggestProps = IOmit<
  ISuggestBaseProps<IFilterableListItem>,
  'itemRenderer' | 'itemLabel' | 'defaultItem' | 'selectedItem' | 'onItemChange'
> & {
  value?: string;
  defaultValue?: string;
  onChange?: (value?: string) => void;
};

export const Suggest = forwardRef<HTMLInputElement, ISuggestProps>(
  function MultiSelect(props, fowardedRef) {
    const { getValueFieldProps, value, defaultValue, onChange, ...other } =
      props;
    const defaultItemRef = useRef(
      other.items.find((item) => item.value === defaultValue) ?? undefined,
    );
    const selectedItem = useMemo(
      () => other.items.find((item) => item.value === value) ?? undefined,
      [other.items, value],
    );

    return (
      <SuggestBase<IFilterableListItem>
        itemsEqual={areFilterableListItemsEqual}
        itemPredicate={filterFilterableListItem}
        itemDisabled={isFilterableListItemDisabled}
        {...other}
        itemRenderer={renderFilterableListItem}
        itemLabel={getFilterableListItemLabel}
        getValueFieldProps={(renderProps, selectedItem) => ({
          leadingIcon: renderProps.isOpen ? undefined : selectedItem?.icon,
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
