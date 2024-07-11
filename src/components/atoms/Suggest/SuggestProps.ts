import type { IOmit } from '@/helpers/types';
import type { ISuggestBaseProps } from '@/components/atoms/SuggestBase';
import type { IFilterableListItem } from '@/components/atoms/FilterableList';

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
