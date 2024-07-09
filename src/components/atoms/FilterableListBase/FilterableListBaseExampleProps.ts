import type { IOmit } from '@/helpers/types';
import type { IFilterableListBaseProps } from './FilterableListBaseProps';
import type { IMovie } from './movies';

export type IFilterableListBaseExampleProps = IOmit<
  IFilterableListBaseProps<IMovie, HTMLDivElement>,
  | 'items'
  | 'renderer'
  | 'itemRenderer'
  | 'itemsEqual'
  | 'itemPredicate'
  | 'noResults'
  | 'createNewItemFromQuery'
  | 'createNewItemRenderer'
> & {
  canFilter?: boolean;
  canCreate?: boolean;
};
