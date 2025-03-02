import type { DndContext } from '@dnd-kit/core';
import type { ComponentProps } from 'react';

import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component';
import type { IMaybeAsync } from '~/utils/types';
import type { ISortableThemeFactory, sortableTheme } from './Sortable.css';

export interface ISortableItem {
  id: string;
  pending?: boolean;
}

export interface ISortableItemRenderProps extends ISortableItem {
  index: number;
  disabled?: boolean;
}

export interface ISortableOwnProps {
  axis?: 'horizontal' | 'vertical';
  initialValue?: Array<string>;
  onChange?: (value: Array<string>) => IMaybeAsync<unknown>;
  minDelay?: number;
  disabled?: boolean;
  startSlot?: React.ReactNode;
  endSlot?: React.ReactNode;
  itemRenderer: (props: ISortableItemRenderProps) => React.ReactNode;
  dndContextProps?: ComponentProps<typeof DndContext>;
}

export interface ISortableProps
  extends IBoxProps,
    IComponentThemeProps<ISortableThemeFactory>,
    ISortableOwnProps {}

export type ISortableFactory = IPolymorphicComponentFactory<{
  props: ISortableProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof sortableTheme;
}>;
