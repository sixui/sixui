import type { IFilterableListItem } from '~/components/FilterableList';
import type { ISelectBaseProps } from '~/components/SelectBase';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';
import type {
  ISelectControlThemeFactory,
  selectControlTheme,
} from './SelectControl.css';

export interface ISelectControlOwnProps
  extends IOmit<
    ISelectBaseProps<IFilterableListItem>,
    | 'itemRenderer'
    | 'itemLabel'
    | 'defaultItem'
    | 'selectedItem'
    | 'onItemChange'
  > {
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string | undefined) => void;
  noResultsLabel?: string;
}

export interface ISelectControlProps
  extends IComponentThemeProps<ISelectControlThemeFactory>,
    ISelectControlOwnProps {}

export type ISelectControlFactory = IComponentFactory<{
  props: ISelectControlProps;
  ref: HTMLDivElement;
  theme: typeof selectControlTheme;
}>;
