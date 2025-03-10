import type { IBoxProps } from '~/components/Box';
import type { IFilterableListItem } from '~/components/FilterableList';
import type { IMultiSelectBaseProps } from '~/components/MultiSelectBase';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';
import {
  IMultiSelectControlThemeFactory,
  multiSelectControlTheme,
} from './MultiSelectControl.css';

export interface IMultiSelectControlOwnProps
  extends IOmit<
    IMultiSelectBaseProps<IFilterableListItem>,
    | 'itemRenderer'
    | 'itemLabel'
    | 'defaultItems'
    | 'selectedItems'
    | 'onItemsChange'
    | 'value'
    | 'defaultValue'
    | 'onChange'
  > {
  value?: Array<string>;
  defaultValue?: Array<string>;
  onChange?: (value: Array<string> | undefined) => void;
  noResultsLabel?: string;
}

export interface IMultiSelectControlProps
  extends IBoxProps,
    IComponentThemeProps<IMultiSelectControlThemeFactory>,
    IMultiSelectControlOwnProps {}

export type IMultiSelectControlFactory = IComponentFactory<{
  props: IMultiSelectControlProps;
  ref: HTMLDivElement;
  theme: typeof multiSelectControlTheme;
}>;
