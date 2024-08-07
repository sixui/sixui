import type { IOmit } from '~/helpers/types';
import type { IMultiSelectBaseProps } from '../MultiSelectBase';
import type { IFilterableListItem } from '../FilterableList';

export type IMultiSelectOwnProps = {
  value?: Array<string>;
  defaultValue?: Array<string>;
  onChange?: (value?: Array<string>) => void;
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
