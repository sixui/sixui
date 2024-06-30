import type { IOmit } from '@/helpers/types';
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
} from '@/components/atoms/FilterableList/movies';
import { Suggest, type ISuggestProps } from './Suggest';

export type ISuggestExampleProps = IOmit<
  ISuggestProps<IMovie>,
  'items' | 'itemRenderer' | 'itemLabel'
> & {
  canCreate?: boolean;
};

export const SuggestExample = (
  props: ISuggestExampleProps,
): React.ReactNode => {
  const { canCreate, ...other } = props;

  return (
    <Suggest<IMovie>
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
