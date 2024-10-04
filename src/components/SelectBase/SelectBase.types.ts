import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IBoxProps } from '../Box';
import type { IFieldBaseProps } from '../FieldBase';
import type { IUseSingleFilterableListBaseProps } from '../FilterableListBase';
import type {
  IFloatingFilterableListBaseProps,
  IFloatingFilterableListBaseTriggerRenderProps,
} from '../FloatingFilterableListBase';

export interface ISelectBaseOwnProps<TItem>
  extends IOmit<
      IFloatingFilterableListBaseProps<TItem, HTMLButtonElement>,
      'onItemSelect' | 'renderer' | 'children'
    >,
    IUseSingleFilterableListBaseProps<TItem, HTMLButtonElement>,
    IOmit<IFieldBaseProps, 'children'> {
  itemLabel: (item: TItem) => React.ReactNode | undefined;
  canFilter?: boolean;
  getValueFieldProps?: (
    renderProps: IFloatingFilterableListBaseTriggerRenderProps<TItem>,
    selectedItem?: TItem,
  ) => Partial<IFieldBaseProps>;
  clearable?: boolean;
}

export interface ISelectBaseProps<TItem>
  extends IBoxProps,
    ISelectBaseOwnProps<TItem> {}

export type ISelectBaseFactory<TItem> = IComponentFactory<{
  props: ISelectBaseProps<TItem>;
  ref: HTMLDivElement;
}>;
