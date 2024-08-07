import type { IOmit } from '~/helpers/types';
import type { IMultiSelectBaseProps } from './MultiSelectBase.types';
import {
  areMoviesEqual,
  createMovie,
  filterMovie,
  isMovieDisabled,
  renderCreateMovieListItem,
  getMovieLabel,
  renderMovieListItem,
  TOP_100_MOVIES,
  type IMovie,
} from '../FilterableListBase/movies';
import { MultiSelectBase } from './MultiSelectBase';

export type IMultiSelectBaseExampleProps = IOmit<
  IMultiSelectBaseProps<IMovie>,
  'items' | 'itemRenderer' | 'itemLabel'
> & {
  canCreate?: boolean;
};

export const MultiSelectBaseExample: React.FC<IMultiSelectBaseExampleProps> = (
  props,
) => {
  const { canCreate, ...other } = props;

  return (
    <MultiSelectBase<IMovie>
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
