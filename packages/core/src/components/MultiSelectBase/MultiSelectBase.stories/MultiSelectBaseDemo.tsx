import type { IMovie } from '~/components/FilterableListBase/FilterableListBase.stories/movies';
import type { IOmit } from '~/utils/types';
import type { IMultiSelectBaseProps } from '../MultiSelectBase.types';
import {
  areMoviesEqual,
  createMovie,
  filterMovie,
  getMovieLabel,
  isMovieDisabled,
  renderCreateMovieListItem,
  renderMovieListItem,
  TOP_100_MOVIES,
} from '~/components/FilterableListBase/FilterableListBase.stories/movies';
import { multiSelectBaseFactory } from '../MultiSelectBase';

export type IMultiSelectBaseDemoProps = IOmit<
  IMultiSelectBaseProps<IMovie>,
  'items' | 'itemLabel' | 'itemRenderer'
> & {
  canCreate?: boolean;
};

const MultiSelectBase = multiSelectBaseFactory<IMovie>();

export const MultiSelectBaseDemo: React.FC<IMultiSelectBaseDemoProps> = (
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
