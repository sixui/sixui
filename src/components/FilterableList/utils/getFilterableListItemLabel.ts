import type { IFilterableListItem } from './FilterableList.types';

export const getFilterableListItemLabel = (
  item: IFilterableListItem,
): React.ReactNode | undefined => item.label ?? item.value;
