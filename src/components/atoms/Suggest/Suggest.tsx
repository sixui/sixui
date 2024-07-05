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
  emptyLabel?: string;
};

export const Suggest = forwardRef<HTMLInputElement, ISuggestProps>(
  function Suggest(props, fowardedRef) {
    const {
      getValueFieldProps,
      value,
      defaultValue,
      onChange,
      emptyLabel,
      ...other
    } = props;
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
    const controlled = value !== undefined;
    const emptyItem: IFilterableListItem = {
      label: emptyLabel,
      placeholder: '—',
      value: '',
    };

    return (
      <SuggestBase<IFilterableListItem>
        itemsEqual={areFilterableListItemsEqual}
        itemPredicate={filterFilterableListItem}
        itemDisabled={isFilterableListItemDisabled}
        emptyItem={emptyItem}
        {...other}
        itemRenderer={renderFilterableListItem}
        itemLabel={getFilterableListItemLabel}
        getValueFieldProps={(renderProps, selectedItem) => ({
          leadingIcon: renderProps.hasFocus ? undefined : selectedItem?.icon,
          ...getValueFieldProps?.(renderProps, selectedItem),
        })}
        defaultItem={defaultItemRef.current}
        selectedItem={selectedItem ?? (controlled ? emptyItem : undefined)}
        onItemChange={(item) => onChange?.(item?.value)}
        ref={fowardedRef}
      />
    );
  },
);
