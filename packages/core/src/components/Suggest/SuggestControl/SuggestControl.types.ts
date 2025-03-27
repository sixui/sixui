import type { IBoxProps } from '~/components/Box';
import type { FieldBaseSkeleton } from '~/components/FieldBase';
import type { IFilterableListItem } from '~/components/FilterableList';
import type { ISuggestBaseProps } from '~/components/SuggestBase';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';
import type {
  ISuggestControlThemeFactory,
  suggestControlTheme,
} from './SuggestControl.css';

export interface ISuggestControlOwnProps
  extends IOmit<
    ISuggestBaseProps<IFilterableListItem>,
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

export interface ISuggestControlProps
  extends IBoxProps,
    IComponentThemeProps<ISuggestControlThemeFactory>,
    ISuggestControlOwnProps {}

export type ISuggestControlFactory = IComponentFactory<{
  props: ISuggestControlProps;
  ref: HTMLDivElement;
  theme: typeof suggestControlTheme;
  staticComponents: {
    Skeleton: typeof FieldBaseSkeleton;
  };
}>;
