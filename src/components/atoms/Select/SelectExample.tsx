import type { IOmit } from '@/helpers/types';
import {
  areMoviesEqual,
  createMovie,
  filterMovie,
  isMovieDisabled,
  renderCreateMovieListItem,
  renderMovieListItem,
  TOP_100_MOVIES,
  type IMovie,
} from '@/components/atoms/FilterableList/movies';
import { Select, type ISelectProps } from './Select';

export type ISelectExampleProps = IOmit<
  ISelectProps<IMovie>,
  'items' | 'itemRenderer'
> & {
  canCreate?: boolean;
};

export const SelectExample = (props: ISelectExampleProps): React.ReactNode => {
  const { canCreate, ...other } = props;

  return (
    <Select<IMovie>
      items={TOP_100_MOVIES}
      itemRenderer={renderMovieListItem}
      itemsEqual={areMoviesEqual}
      itemPredicate={filterMovie}
      itemDisabled={isMovieDisabled}
      createNewItemFromQuery={createMovie}
      createNewItemRenderer={canCreate ? renderCreateMovieListItem : undefined}
      getValueFieldProps={(_buttonProps, selectedItem) => ({
        children: selectedItem?.title,
      })}
      {...other}
    />
  );
};
