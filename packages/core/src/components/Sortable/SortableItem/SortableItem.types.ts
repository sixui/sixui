import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component';
import type { IOmit, ISide } from '~/utils/types';
import type {
  ISortableItemThemeFactory,
  sortableItemTheme,
} from './SortableItem.css';

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

export interface ISortableItemProps
  extends IBoxProps,
    IComponentThemeProps<ISortableItemThemeFactory>,
    ISortableItemOwnProps {}

export type ISortableItemFactory = IPolymorphicComponentFactory<{
  props: ISortableItemProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof sortableItemTheme;
}>;
