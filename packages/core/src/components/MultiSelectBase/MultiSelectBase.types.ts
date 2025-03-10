import type { IBoxProps } from '~/components/Box';
import type { IInputChipProps } from '~/components/Chip';
import type { IUseMultiFilterableListBaseProps } from '~/components/FilterableListBase';
import type {
  IFloatingFilterableListBaseOwnProps,
  IFloatingFilterableListBaseTriggerRenderProps,
} from '~/components/FloatingFilterableListBase';
import type { IMenuListProps } from '~/components/Menu/MenuList';
import type { ITextInputControlOwnProps } from '~/components/TextInput';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';
import type {
  IMultiSelectBaseThemeFactory,
  multiSelectBaseTheme,
} from './MultiSelectBase.css';

export interface IMultiSelectBaseOwnProps<TItem>
  extends IOmit<
      IFloatingFilterableListBaseOwnProps<TItem>,
      'onItemSelect' | 'renderer' | 'children'
    >,
    IUseMultiFilterableListBaseProps<TItem, HTMLElement>,
    IOmit<ITextInputControlOwnProps, 'children' | 'onChange'> {
  itemLabel: (item: TItem) => React.ReactNode | undefined;
  getValueFieldProps?: (
    props: IFloatingFilterableListBaseTriggerRenderProps<TItem>,
    selectedItem: TItem,
  ) => IInputChipProps;
  clearable?: boolean;
  menuListProps?: Partial<IMenuListProps>;
}

export interface IMultiSelectBaseProps<TItem>
  extends IBoxProps,
    IComponentThemeProps<IMultiSelectBaseThemeFactory>,
    IMultiSelectBaseOwnProps<TItem> {}

export type IMultiSelectBaseFactory<TItem> = IComponentFactory<{
  props: IMultiSelectBaseProps<TItem>;
  ref: HTMLDivElement;
  theme: typeof multiSelectBaseTheme;
}>;
