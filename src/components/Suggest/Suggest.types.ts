import type { IOmit } from '@/helpers/types';
import type { ISuggestBaseProps } from '@/components/SuggestBase';
import type { IFilterableListItem } from '@/components/FilterableList';

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
