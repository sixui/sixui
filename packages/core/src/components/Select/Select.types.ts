import type { IFilterableListItem } from '~/components/FilterableList';
import type { ISelectBaseProps } from '~/components/SelectBase';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';

export type ISelectOwnProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string | undefined) => void;
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
