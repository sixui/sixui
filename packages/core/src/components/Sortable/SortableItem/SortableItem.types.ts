import type { IPaperOwnProps } from '~/components/Paper';
import type { IPolymorphicComponentFactory } from '~/utils/component';
import type { IOmit, ISide } from '~/utils/types';

export interface ISortableItemDragHandleRenderProps {
  getProps: () => Record<string, unknown>;
}

export interface ISortableItemChildrenRenderProps {
  getItemProps: () => Record<string, unknown>;
  getDragHandleProps: () => Record<string, unknown>;
  renderDragHandle(): React.ReactNode;
}

export interface ISortableItemOwnProps
  extends IOmit<IPaperOwnProps, 'children'> {
  id: string;
  fixed?: boolean;
  children?:
    | ((props: ISortableItemChildrenRenderProps) => React.ReactNode)
    | React.ReactNode;
  dragHandle?: boolean;
  dragHandlePosition?: ISide;
  dragHandleRenderer?: (
    props: ISortableItemDragHandleRenderProps,
  ) => React.ReactNode;
}

export type ISortableItemProps = ISortableItemOwnProps;

export type ISortableItemFactory = IPolymorphicComponentFactory<{
  props: ISortableItemProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
}>;
