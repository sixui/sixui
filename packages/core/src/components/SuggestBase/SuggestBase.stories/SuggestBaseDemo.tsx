import type { IMovie } from '~/components/FilterableListBase/FilterableListBase.stories/movies';
import type { IOmit } from '~/helpers/types';
import type { ISuggestBaseProps } from '../SuggestBase.types';
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
import { suggestBaseFactory } from '../SuggestBase';

export type ISuggestBaseDemoProps = IOmit<
  ISuggestBaseProps<IMovie>,
  'items' | 'itemLabel' | 'itemRenderer'
> & {
  canCreate?: boolean;
};

const SuggestBase = suggestBaseFactory<IMovie>();

export const SuggestBaseDemo = (
  props: ISuggestBaseDemoProps,
): React.ReactNode => {
  const { canCreate, ...other } = props;

  return (
    <SuggestBase
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
