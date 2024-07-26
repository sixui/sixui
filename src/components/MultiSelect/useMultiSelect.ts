import { useMemo, useRef } from 'react';

import type { IFilterableListItem } from '~/components/FilterableList';

export type IUseSelectProps = {
  items: Array<IFilterableListItem>;
  defaultValue?: Array<string>;
  value?: Array<string>;
};

export type IUseSelectResult = {
  defaultItems?: Array<IFilterableListItem>;
  selectedItems?: Array<IFilterableListItem>;
};

export const useMultiSelect = (props: IUseSelectProps): IUseSelectResult => {
  const { items, defaultValue, value } = props;
  const defaultItemsRef = useRef(
    defaultValue
      ? items.filter((item) => defaultValue?.includes(item.value))
      : undefined,
  );
  const selectedItems = useMemo(
    () =>
      value !== undefined
        ? items.filter((item) => value?.includes(item.value))
        : undefined,
    [items, value],
  );

  return {
    defaultItems: defaultItemsRef.current,
    selectedItems,
  };
};
