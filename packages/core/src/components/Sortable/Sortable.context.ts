import type { IOrientation } from '~/utils/types';
import { createOptionalContext } from '~/utils/react';

export type ISortableContextValue = {
  axis?: IOrientation;
  dragging?: boolean;
};

export const [SortableContextProvider, useSortableContext] =
  createOptionalContext<ISortableContextValue>();
