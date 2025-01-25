import type { IMovie } from '~/components/FilterableListBase/movies';
import type { IOmit } from '~/helpers/types';
import type { IMultiSelectBaseProps } from './MultiSelectBase.types';
import {
  areMoviesEqual,
  createMovie,
  filterMovie,
  getMovieLabel,
  isMovieDisabled,
  renderCreateMovieListItem,
  renderMovieListItem,
  TOP_100_MOVIES,
} from '~/components/FilterableListBase/movies';
import { multiSelectBaseFactory } from './MultiSelectBase';

export type IMultiSelectBaseExampleProps = IOmit<
  IMultiSelectBaseProps<IMovie>,
  'items' | 'itemLabel' | 'itemRenderer'
> & {
  canCreate?: boolean;
};

const MultiSelectBase = multiSelectBaseFactory<IMovie>();

export const MultiSelectBaseExample: React.FC<IMultiSelectBaseExampleProps> = (
  props,
) => {
  const { canCreate, ...other } = props;

  return (
    <MultiSelectBase
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
