import type { IFilterableListItem } from '~/components/FilterableList';
import type { IMultiSelectBaseProps } from '~/components/MultiSelectBase';
import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';

export type IMultiSelectOwnProps = {
  value?: Array<string>;
  defaultValue?: Array<string>;
  onChange?: (value: Array<string> | undefined) => void;
  noResultsLabel?: string;
};

export type IMultiSelectProps = Omit<
  IOmit<
    IMultiSelectBaseProps<IFilterableListItem>,
    | 'itemRenderer'
    | 'itemLabel'
    | 'defaultItems'
    | 'selectedItems'
    | 'onItemsChange'
  >,
  keyof IMultiSelectOwnProps
> &
  IMultiSelectOwnProps;

export type IMultiSelectFactory = IComponentFactory<{
  props: IMultiSelectProps;
  ref: HTMLDivElement;
}>;
