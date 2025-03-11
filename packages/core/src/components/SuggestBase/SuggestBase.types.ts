import type { IBoxProps } from '~/components/Box';
import type { IUseSingleFilterableListBaseProps } from '~/components/FilterableListBase';
import type {
  IFloatingFilterableListBaseProps,
  IFloatingFilterableListBaseTriggerRenderProps,
} from '~/components/FloatingFilterableListBase';
import type { IMenuListProps } from '~/components/Menu/MenuList';
import type { ITextInputControlOwnProps } from '~/components/TextInput';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';
import type {
  ISuggestBaseThemeFactory,
  suggestBaseTheme,
} from './SuggestBase.css';

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
    IOmit<ITextInputControlOwnProps, 'children' | 'onChange'> {
  itemLabel: (item: TItem) => React.ReactNode | undefined;
  getValueFieldProps?: (
    props: IFloatingFilterableListBaseTriggerRenderProps<TItem>,
    selectedItem?: TItem,
  ) => Partial<ITextInputControlOwnProps>;
  clearable?: boolean;
  menuListProps?: Partial<IMenuListProps>;
}

export interface ISuggestBaseProps<TItem>
  extends IBoxProps,
    IComponentThemeProps<ISuggestBaseThemeFactory>,
    ISuggestBaseOwnProps<TItem> {}

export type ISuggestBaseFactory<TItem> = IComponentFactory<{
  props: ISuggestBaseProps<TItem>;
  ref: HTMLDivElement;
  theme: typeof suggestBaseTheme;
}>;
