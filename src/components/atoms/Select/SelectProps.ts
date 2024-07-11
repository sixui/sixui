import type { IOmit } from '@/helpers/types';
import type { ISelectBaseProps } from '@/components/atoms/SelectBase';
import type { IFilterableListItem } from '@/components/atoms/FilterableList';

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
