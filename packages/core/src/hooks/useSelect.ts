import { useCallback, useMemo, useRef } from 'react';

import type { IFilterableListItem } from '~/components/FilterableList';
import { useControlledValue } from './useControlledValue';

const DEFAUL_EMPTY_ITEM: IFilterableListItem = {
  label: '',
  value: '',
};

export interface IUseSelectProps {
  items: Array<IFilterableListItem>;
  itemEmpty: (item: IFilterableListItem) => boolean;
  defaultValue?: string;
  value?: string;
  onChange?: (value?: string) => void;
}

export interface IUseSelectResult {
  defaultItem?: IFilterableListItem;
  selectedItem?: IFilterableListItem;
  onItemChange?: (item?: IFilterableListItem) => void;
  value?: string;
}

export const useSelect = (props: IUseSelectProps): IUseSelectResult => {
  const { items, itemEmpty, defaultValue, value: valueProp, onChange } = props;

  const [value, setValue] = useControlledValue({
    controlled: valueProp,
    default: defaultValue,
    name: 'Select',
  });

  const emptyItem = useMemo(() => items.find(itemEmpty), [items, itemEmpty]);
  const defaultItemRef = useRef(
    defaultValue !== undefined
      ? (items.find((item) => item.value === defaultValue) ?? undefined)
      : valueProp !== undefined
        ? defaultValue
        : emptyItem,
  );
  const selectedItem = useMemo(
    () =>
      valueProp !== undefined
        ? (items.find((item) => item.value === valueProp) ??
          emptyItem ??
          DEFAUL_EMPTY_ITEM)
        : undefined,
    [items, valueProp, emptyItem],
  );
  const handleItemChange = useCallback(
    (item?: IFilterableListItem): void => {
      const value = item?.value;
      onChange?.(value);
      setValue(value);
    },
    [onChange, setValue],
  );

  return {
    defaultItem: defaultItemRef.current,
    selectedItem,
    onItemChange: handleItemChange,
    value,
  };
};
