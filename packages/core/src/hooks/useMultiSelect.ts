import { useMemo, useRef } from 'react';

import type { IFilterableListItem } from '~/components/FilterableList';

export type IUseMultiSelectProps = {
  items: Array<IFilterableListItem>;
  defaultValue?: Array<string>;
  value?: Array<string>;
};

export type IUseMultiSelectResult = {
  defaultItems?: Array<IFilterableListItem>;
  selectedItems?: Array<IFilterableListItem>;
};

export const useMultiSelect = (
  props: IUseMultiSelectProps,
): IUseMultiSelectResult => {
  const { items, defaultValue, value: values } = props;
  const defaultItemsRef = useRef(
    defaultValue
      ? items.filter((item) => defaultValue.includes(item.value))
      : undefined,
  );
  const selectedItems = useMemo(
    () =>
      values !== undefined
        ? values
            .map((value) => items.find((item) => item.value === value))
            .filter((item) => !!item)
        : undefined,
    [items, values],
  );

  return {
    defaultItems: defaultItemsRef.current,
    selectedItems,
  };
};
