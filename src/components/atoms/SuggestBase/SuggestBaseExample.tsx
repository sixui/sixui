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
} from '@/components/atoms/FilterableListBase/movies';
import { SuggestBase, type ISuggestBaseProps } from './SuggestBase';

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
