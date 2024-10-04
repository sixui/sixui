import type { IOmit } from '~/helpers/types';
import type { IMovie } from '../FilterableListBase/movies';
import type { ISelectBaseProps } from './SelectBase.types';
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
import { selectBaseFactory } from './SelectBase';

export type ISelectBaseExampleProps = IOmit<
  ISelectBaseProps<IMovie>,
  'items' | 'itemLabel' | 'itemRenderer'
> & {
  canCreate?: boolean;
};

const SelectBase = selectBaseFactory<IMovie, HTMLButtonElement>();

export const SelectBaseExample = (
  props: ISelectBaseExampleProps,
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
