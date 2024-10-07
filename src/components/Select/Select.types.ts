import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IFilterableListItem } from '../FilterableList';
import type { ISelectBaseProps } from '../SelectBase';

export type ISelectOwnProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value?: string) => void;
  noResultsLabel?: string;
};

export type ISelectProps = Omit<
  IOmit<
    ISelectBaseProps<IFilterableListItem>,
    | 'itemRenderer'
    | 'itemLabel'
    | 'defaultItem'
    | 'selectedItem'
    | 'onItemChange'
  >,
  keyof ISelectOwnProps
> &
  ISelectOwnProps;

export type ISelectFactory = IComponentFactory<{
  props: ISelectProps;
  ref: HTMLDivElement;
}>;
