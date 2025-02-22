import type { IFilterableListItem } from '~/components/FilterableList';
import type { IMultiSelectBaseProps } from '~/components/MultiSelectBase';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';

export type IMultiSelectOwnProps = {
  value?: Array<string>;
  defaultValue?: Array<string>;
  onChange?: (value: Array<string> | undefined) => void;
  noResultsLabel?: string;
};

export interface IMultiSelectProps
  extends Omit<
      IOmit<
        IMultiSelectBaseProps<IFilterableListItem>,
        | 'itemRenderer'
        | 'itemLabel'
        | 'defaultItems'
        | 'selectedItems'
        | 'onItemsChange'
      >,
      keyof IMultiSelectOwnProps
    >,
    IMultiSelectOwnProps {}

export type IMultiSelectFactory = IComponentFactory<{
  props: IMultiSelectProps;
  ref: HTMLDivElement;
}>;
