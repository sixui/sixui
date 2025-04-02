import type { IBoxProps } from '~/components/Box';
import type { IFilterableListBaseProps } from '~/components/FilterableListBase';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IOmit } from '~/utils/types';

export interface IFilterableListItem {
  leading?: React.ReactNode;
  icon?: React.ReactNode;
  imageUrl?: string;
  video?: Array<{ type: string; src: string }>;
  label?: React.ReactNode;
  placeholder?: string;
  supportingText?: string;
  trailingSupportingText?: string;
  value: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

export interface IFilterableListOwnProps
  extends IOmit<
    IFilterableListBaseProps<IFilterableListItem>,
    'renderer' | 'itemRenderer'
  > {
  canFilter?: boolean;
}

export interface IFilterableListProps
  extends IBoxProps,
    IFilterableListOwnProps {}

export type IFilterableListFactory = IPolymorphicComponentFactory<{
  props: IFilterableListProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
}>;
