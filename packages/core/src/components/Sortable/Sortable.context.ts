import type { ISortableProps } from './Sortable.types';
import { createOptionalContext } from '~/utils/react';

export type ISortableContextValue = {
  axis?: ISortableProps['axis'];
  dragging?: boolean;
};

export const [SortableContextProvider, useSortableContext] =
  createOptionalContext<ISortableContextValue>();
