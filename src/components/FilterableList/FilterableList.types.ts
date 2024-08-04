import type { IOmit } from '~/helpers/types';
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
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  href?: string;
};

export type IFilterableListProps = IOmit<
  IFilterableListBaseProps<IFilterableListItem, HTMLElement>,
  'renderer' | 'itemRenderer'
> & {
  canFilter?: boolean;
};
