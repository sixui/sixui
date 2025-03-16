import { useCallback, useMemo, useRef } from 'react';

import type { IFilterableListItem } from '~/components/FilterableList';
import { useControlledValue } from './useControlledValue';

export type IUseMultiSelectProps = {
  items: Array<IFilterableListItem>;
  defaultValue?: Array<string>;
  value?: Array<string>;
  onChange?: (values?: Array<string>) => void;
};

export type IUseMultiSelectResult = {
  defaultItems?: Array<IFilterableListItem>;
  selectedItems?: Array<IFilterableListItem>;
  onItemsChange?: (items: Array<IFilterableListItem>) => void;
  value?: Array<string>;
};

export const useMultiSelect = (
  props: IUseMultiSelectProps,
): IUseMultiSelectResult => {
  const { items, defaultValue, value: valueProp, onChange } = props;

  const [value, setValue] = useControlledValue({
    controlled: valueProp,
    default: defaultValue,
    name: 'MultiSelect',
  });

  const defaultItemsRef = useRef(
    defaultValue
      ? items.filter((item) => defaultValue.includes(item.value))
      : undefined,
  );
  const selectedItems = useMemo(
    () =>
      valueProp !== undefined
        ? valueProp
            .map((value) => items.find((item) => item.value === value))
            .filter((item) => !!item)
        : undefined,
    [items, valueProp],
  );
  const handleItemsChange = useCallback(
    (items: Array<IFilterableListItem>): void => {
      const value = items.map((item) => item.value);
      onChange?.(value);
      setValue(value);
    },
    [onChange, setValue],
  );

  return {
    defaultItems: defaultItemsRef.current,
    selectedItems,
    onItemsChange: handleItemsChange,
    value,
  };
};
