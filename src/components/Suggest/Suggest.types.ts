import type { IFilterableListItem } from '~/components/FilterableList';
import type { ISuggestBaseProps } from '~/components/SuggestBase';
import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';

export type ISuggestOwnProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string | undefined) => void;
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

export type ISuggestFactory = IComponentFactory<{
  props: ISuggestProps;
  ref: HTMLDivElement;
}>;
