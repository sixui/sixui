import type { IOmit } from '~/helpers/types';
import type { IFilterableListItem } from '../FilterableList';
import type { ISuggestBaseProps } from '../SuggestBase';

export type ISuggestOwnProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value?: string) => void;
  noResultsLabel?: string;
};

export type ISuggestProps = Omit<
  IOmit<
    ISuggestBaseProps<IFilterableListItem>,
    | 'itemRenderer'
    | 'itemLabel'
    | 'defaultItem'
    | 'selectedItem'
    | 'onItemChange'
  >,
  keyof ISuggestOwnProps
> &
  ISuggestOwnProps;
