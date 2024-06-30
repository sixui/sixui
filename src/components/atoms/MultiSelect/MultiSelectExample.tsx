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
import { MultiSelect, type IMultiSelectProps } from './MultiSelect';

export type IMultiSelectExampleProps = IOmit<
  IMultiSelectProps<IMovie>,
  'items' | 'itemRenderer' | 'itemLabel'
> & {
  canCreate?: boolean;
};

export const MultiSelectExample: React.FC<IMultiSelectExampleProps> = (
  props,
) => {
  const { canCreate, ...other } = props;

  return (
    <MultiSelect<IMovie>
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
