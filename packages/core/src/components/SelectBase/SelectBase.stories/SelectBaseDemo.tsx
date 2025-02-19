import type { IMovie } from '~/components/FilterableListBase/FilterableListBase.stories/movies';
import type { IOmit } from '~/utils/types';
import type { ISelectBaseProps } from '../SelectBase.types';
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
import { selectBaseFactory } from '../SelectBase';

export type ISelectBaseDemoProps = IOmit<
  ISelectBaseProps<IMovie>,
  'items' | 'itemLabel' | 'itemRenderer'
> & {
  canCreate?: boolean;
};

const SelectBase = selectBaseFactory<IMovie>();

export const SelectBaseDemo = (
  props: ISelectBaseDemoProps,
): React.ReactNode => {
  const { canCreate, ...other } = props;

  return (
    <SelectBase
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
