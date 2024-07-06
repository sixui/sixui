import { useMemo, useRef } from 'react';

import type { IFilterableListItem } from '@/components/atoms/FilterableList';

export type IUseSelectProps = {
  items: Array<IFilterableListItem>;
  defaultValues?: Array<string>;
  values?: Array<string>;
};

export type IUseSelectResult = {
  defaultItems?: Array<IFilterableListItem>;
  selectedItems?: Array<IFilterableListItem>;
};

export const useMultiSelect = (props: IUseSelectProps): IUseSelectResult => {
  const { items, defaultValues, values } = props;
  const defaultItemsRef = useRef(
    defaultValues
      ? items.filter((item) => defaultValues?.includes(item.value))
      : undefined,
  );
  const selectedItems = useMemo(
    () =>
      values !== undefined
        ? items.filter((item) => values?.includes(item.value))
        : undefined,
    [items, values],
  );

  return {
    defaultItems: defaultItemsRef.current,
    selectedItems,
  };
};
