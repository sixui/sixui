import type { IOmit } from '~/helpers/types';
import type { IMovie } from '../FilterableListBase/movies';
import type { ISuggestBaseProps } from './SuggestBase.types';
import {
  areMoviesEqual,
  createMovie,
  filterMovie,
  getMovieLabel,
  isMovieDisabled,
  renderCreateMovieListItem,
  renderMovieListItem,
  TOP_100_MOVIES,
} from '../FilterableListBase/movies';
import { SuggestBase } from './SuggestBase';

export type ISuggestBaseExampleProps = IOmit<
  ISuggestBaseProps<IMovie>,
  'items' | 'itemRenderer' | 'itemLabel'
> & {
  canCreate?: boolean;
};

export const SuggestBaseExample = (
  props: ISuggestBaseExampleProps,
): React.ReactNode => {
  const { canCreate, ...other } = props;

  return (
    <SuggestBase<IMovie>
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
