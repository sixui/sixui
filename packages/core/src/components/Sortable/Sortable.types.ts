import type { DndContext } from '@dnd-kit/core';
import type { ComponentProps } from 'react';

import type { IComponentFactory } from '~/utils/component';
import type { IMaybeAsync, IOrientation } from '~/utils/types';
import type { SortableItem } from './SortableItem';

export interface ISortableItem<TItem> {
  item: TItem;
  id: string;
  processing?: boolean;
  itemProcessing?: boolean;
  disabled?: boolean;
  onDelete?: () => IMaybeAsync<unknown>;
}

export interface ISortableChildrenRenderProps<TItem> {
  sortableItems: Array<ISortableItem<TItem>>;
}

export interface ISortableOwnProps<TItem> {
  axis?: IOrientation;
  items?: Array<TItem>;
  getItemId?: (item: TItem) => string;
  onReorder?: (items: Array<TItem>) => IMaybeAsync<unknown>;
  onDelete?: (item: TItem) => IMaybeAsync<unknown>;
  onChange?: (items: Array<TItem>) => IMaybeAsync<unknown>;
  minChangeDuration?: number;
  disabled?: boolean;
  startSlot?: React.ReactNode;
  endSlot?: React.ReactNode;
  children: (props: ISortableChildrenRenderProps<TItem>) => React.ReactNode;
  dndContextProps?: ComponentProps<typeof DndContext>;
}

export interface ISortableFactoryProps<TItem> {
  getItemId: (item: TItem) => string;
}

export type ISortableProps<TItem> = ISortableOwnProps<TItem>;

export type ISortableFactory<TItem> = IComponentFactory<{
  props: ISortableProps<TItem>;
  defaultRef: never;
  defaultRoot: undefined;
  staticComponents: {
    Item: typeof SortableItem;
  };
}>;
