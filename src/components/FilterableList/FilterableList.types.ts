import type { IOmit } from '~/helpers/types';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IBoxProps } from '../Box';
import type { IFilterableListBaseProps } from '../FilterableListBase';

export type IFilterableListItem = {
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
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
  href?: string;
};

export interface IFilterableListOwnProps {
  canFilter?: boolean;
}

export interface IFilterableListProps
  extends IBoxProps,
    IOmit<
      IFilterableListBaseProps<IFilterableListItem, HTMLElement>,
      'renderer' | 'itemRenderer'
    >,
    IFilterableListOwnProps {}

export type IFilterableListFactory = IPolymorphicComponentFactory<{
  props: IFilterableListProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
}>;
