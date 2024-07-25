import { useMemo, useRef } from 'react';

import type { IFilterableListItem } from '@/components/FilterableList';

const DEFAUL_EMPTY_ITEM: IFilterableListItem = {
  label: '',
  value: '',
};

export type IUseSelectProps = {
  items: Array<IFilterableListItem>;
  itemEmpty: (item: IFilterableListItem) => boolean;
  defaultValue?: string;
  value?: string;
};

export type IUseSelectResult = {
  defaultItem?: IFilterableListItem;
  selectedItem?: IFilterableListItem;
};

export const useSelect = (props: IUseSelectProps): IUseSelectResult => {
  const { items, itemEmpty, defaultValue, value } = props;
  const emptyItem = useMemo(() => items.find(itemEmpty), [items, itemEmpty]);
  const defaultItemRef = useRef(
    defaultValue !== undefined
      ? (items.find((item) => item.value === defaultValue) ?? undefined)
      : value !== undefined
        ? defaultValue
        : emptyItem,
  );
  const selectedItem = useMemo(
    () =>
      value !== undefined
        ? (items.find((item) => item.value === value) ??
          emptyItem ??
          DEFAUL_EMPTY_ITEM)
        : undefined,
    [items, value, emptyItem],
  );

  return {
    defaultItem: defaultItemRef.current,
    selectedItem,
  };
};
