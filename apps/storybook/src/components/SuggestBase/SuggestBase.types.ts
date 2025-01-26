import type { IBoxProps } from '~/components/Box';
import type { IUseSingleFilterableListBaseProps } from '~/components/FilterableListBase';
import type {
  IFloatingFilterableListBaseProps,
  IFloatingFilterableListBaseTriggerRenderProps,
} from '~/components/FloatingFilterableListBase';
import type { IMenuListProps } from '~/components/Menu/MenuList';
import type { ITextInputFieldProps } from '~/components/TextInputField';
import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';

export interface ISuggestBaseOwnProps<TItem>
  extends IOmit<
      IFloatingFilterableListBaseProps<TItem>,
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
