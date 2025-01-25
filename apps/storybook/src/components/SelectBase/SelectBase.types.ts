import type { IBoxProps } from '~/components/Box';
import type { IFieldBaseProps } from '~/components/FieldBase';
import type { IUseSingleFilterableListBaseProps } from '~/components/FilterableListBase';
import type {
  IFloatingFilterableListBaseProps,
  IFloatingFilterableListBaseTriggerRenderProps,
} from '~/components/FloatingFilterableListBase';
import type { IMenuListProps } from '~/components/Menu/MenuList';
import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';

export interface ISelectBaseOwnProps<TItem>
  extends IOmit<
      IFloatingFilterableListBaseProps<TItem, HTMLElement>,
      'onItemSelect' | 'renderer' | 'children'
    >,
    IUseSingleFilterableListBaseProps<TItem, HTMLElement>,
    IOmit<IFieldBaseProps, 'children'> {
  itemLabel: (item: TItem) => React.ReactNode | undefined;
  canFilter?: boolean;
  getValueFieldProps?: (
    renderProps: IFloatingFilterableListBaseTriggerRenderProps<TItem>,
    selectedItem?: TItem,
  ) => Partial<IFieldBaseProps>;
  clearable?: boolean;
  menuListProps?: Partial<IMenuListProps>;
}

export interface ISelectBaseProps<TItem>
  extends IBoxProps,
    ISelectBaseOwnProps<TItem> {}

export type ISelectBaseFactory<TItem> = IComponentFactory<{
  props: ISelectBaseProps<TItem>;
  ref: HTMLDivElement;
}>;
