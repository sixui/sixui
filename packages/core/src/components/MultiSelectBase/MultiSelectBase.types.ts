import type { IBoxProps } from '~/components/Box';
import type { IInputChipProps } from '~/components/Chip';
import type { IUseMultiFilterableListBaseProps } from '~/components/FilterableListBase';
import type {
  IFloatingFilterableListBaseProps,
  IFloatingFilterableListBaseTriggerRenderProps,
} from '~/components/FloatingFilterableListBase';
import type { IMenuListProps } from '~/components/Menu/MenuList';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';
import { ITextInputFieldProps } from '~/components/TextInputField';

export interface IMultiSelectBaseOwnProps<TItem>
  extends IOmit<
      IFloatingFilterableListBaseProps<TItem>,
      'onItemSelect' | 'renderer' | 'children'
    >,
    IUseMultiFilterableListBaseProps<TItem, HTMLElement>,
    IOmit<ITextInputFieldProps, 'children' | 'onChange'> {
  itemLabel: (item: TItem) => React.ReactNode | undefined;
  getValueFieldProps?: (
    renderProps: IFloatingFilterableListBaseTriggerRenderProps<TItem>,
    selectedItem: TItem,
  ) => IInputChipProps;
  clearable?: boolean;
  menuListProps?: Partial<IMenuListProps>;
}

export interface IMultiSelectBaseProps<TItem>
  extends IBoxProps,
    IMultiSelectBaseOwnProps<TItem> {}

export type IMultiSelectBaseFactory<TItem> = IComponentFactory<{
  props: IMultiSelectBaseProps<TItem>;
  ref: HTMLDivElement;
}>;
