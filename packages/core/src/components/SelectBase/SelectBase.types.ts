import type { IBoxProps } from '~/components/Box';
import type { IFieldBaseProps } from '~/components/FieldBase';
import type { IUseSingleFilterableListBaseProps } from '~/components/FilterableListBase';
import type {
  IFloatingFilterableListBaseProps,
  IFloatingFilterableListBaseTriggerRenderProps,
} from '~/components/FloatingFilterableListBase';
import type { IMenuListProps } from '~/components/Menu/MenuList';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';
import type {
  ISelectBaseThemeFactory,
  selectBaseTheme,
} from './SelectBase.css';

export interface ISelectBaseOwnProps<TItem>
  extends IOmit<
      IFloatingFilterableListBaseProps<TItem>,
      'onItemSelect' | 'renderer' | 'children'
    >,
    IUseSingleFilterableListBaseProps<TItem, HTMLElement>,
    IOmit<IFieldBaseProps, 'children'> {
  itemLabel: (item: TItem) => React.ReactNode | undefined;
  canFilter?: boolean;
  getValueFieldProps?: (
    props: IFloatingFilterableListBaseTriggerRenderProps<TItem>,
    selectedItem?: TItem,
  ) => Partial<IFieldBaseProps>;
  clearable?: boolean;
  menuListProps?: Partial<IMenuListProps>;
}

export interface ISelectBaseProps<TItem>
  extends IBoxProps,
    IComponentThemeProps<ISelectBaseThemeFactory>,
    ISelectBaseOwnProps<TItem> {}

export type ISelectBaseFactory<TItem> = IComponentFactory<{
  props: ISelectBaseProps<TItem>;
  ref: HTMLDivElement;
  theme: typeof selectBaseTheme;
}>;
