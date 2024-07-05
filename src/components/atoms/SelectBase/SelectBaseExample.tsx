import type { IOmit } from '@/helpers/types';
import {
  areMoviesEqual,
  createMovie,
  filterMovie,
  isMovieDisabled,
  getMovieLabel,
  renderCreateMovieListItem,
  renderMovieListItem,
  TOP_100_MOVIES,
  type IMovie,
} from '@/components/atoms/FilterableListBase/movies';
import { SelectBase, type ISelectBaseProps } from './SelectBase';

export type ISelectBaseExampleProps = IOmit<
  ISelectBaseProps<IMovie>,
  'items' | 'itemLabel' | 'itemRenderer'
> & {
  canCreate?: boolean;
};

export const SelectBaseExample = (
  props: ISelectBaseExampleProps,
): React.ReactNode => {
  const { canCreate, ...other } = props;

  return (
    <SelectBase<IMovie>
      items={TOP_100_MOVIES}
      itemRenderer={renderMovieListItem}
      itemLabel={getMovieLabel}
      itemsEqual={areMoviesEqual}
      itemPredicate={filterMovie}
      itemDisabled={isMovieDisabled}
      createNewItemFromQuery={createMovie}
      createNewItemRenderer={canCreate ? renderCreateMovieListItem : undefined}
      {...other}
    />
  );
};