import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IBoxProps } from '../Box';
import type { IUseSingleFilterableListBaseProps } from '../FilterableListBase';
import type {
  IFloatingFilterableListBaseProps,
  IFloatingFilterableListBaseTriggerRenderProps,
} from '../FloatingFilterableListBase';
import type { IMenuListProps } from '../MenuList';
import { ITextInputFieldProps } from '../TextInputField';

export interface ISuggestBaseOwnProps<TItem>
  extends IOmit<
      IFloatingFilterableListBaseProps<TItem, HTMLElement>,
      | 'onItemSelect'
      | 'renderer'
      | 'listRenderer'
      | 'itemRenderer'
      | 'itemsEqual'
      | 'children'
      | 'defaultQuery'
    >,
    IUseSingleFilterableListBaseProps<TItem, HTMLElement>,
    IOmit<ITextInputFieldProps, 'children'> {
  itemLabel: (item: TItem) => React.ReactNode | undefined;
  getValueFieldProps?: (
    renderProps: IFloatingFilterableListBaseTriggerRenderProps<TItem>,
    selectedItem?: TItem,
  ) => Partial<ITextInputFieldProps>;
  clearable?: boolean;
  menuListProps?: Partial<IMenuListProps>;
}

export interface ISuggestBaseProps<TItem>
  extends IBoxProps,
    ISuggestBaseOwnProps<TItem> {}

export type ISuggestBaseFactory<TItem> = IComponentFactory<{
  props: ISuggestBaseProps<TItem>;
  ref: HTMLDivElement;
}>;
