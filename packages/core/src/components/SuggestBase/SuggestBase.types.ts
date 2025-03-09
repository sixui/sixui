import type { IBoxProps } from '~/components/Box';
import type { IUseSingleFilterableListBaseProps } from '~/components/FilterableListBase';
import type {
  IFloatingFilterableListBaseProps,
  IFloatingFilterableListBaseTriggerRenderProps,
} from '~/components/FloatingFilterableListBase';
import type { IMenuListProps } from '~/components/Menu/MenuList';
import type { ITextInputProps } from '~/components/TextInput';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';

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
    IOmit<ITextInputProps, 'children' | 'onChange'> {
  itemLabel: (item: TItem) => React.ReactNode | undefined;
  getValueFieldProps?: (
    props: IFloatingFilterableListBaseTriggerRenderProps<TItem>,
    selectedItem?: TItem,
  ) => Partial<ITextInputProps>;
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
