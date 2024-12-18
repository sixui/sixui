import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IBoxProps } from '../Box';
import type { IInputChipProps } from '../Chip';
import type { IUseMultiFilterableListBaseProps } from '../FilterableListBase';
import type {
  IFloatingFilterableListBaseProps,
  IFloatingFilterableListBaseTriggerRenderProps,
} from '../FloatingFilterableListBase';
import type { IMenuListProps } from '../MenuList';
import { ITextInputFieldProps } from '../TextInputField';

export interface IMultiSelectBaseOwnProps<TItem>
  extends IOmit<
      IFloatingFilterableListBaseProps<TItem, HTMLElement>,
      'onItemSelect' | 'renderer' | 'children'
    >,
    IUseMultiFilterableListBaseProps<TItem, HTMLElement>,
    IOmit<ITextInputFieldProps, 'children'> {
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
