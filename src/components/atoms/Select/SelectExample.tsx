import { IOmit } from '@/helpers/types';
import {
  areMoviesEqual,
  createMovie,
  filterMovie,
  renderCreateMovieListItem,
  renderMovieListItem,
  TOP_100_MOVIES,
  type IMovie,
} from '@/components/atoms/FilteredList/movies';
import { Select, type ISelectProps } from './Select';

export type ISelectExampleProps = IOmit<
  ISelectProps<IMovie>,
  'items' | 'itemRenderer'
>;

export const SelectExample = (props: ISelectExampleProps): React.ReactNode => {
  return (
    <Select<IMovie>
      items={TOP_100_MOVIES}
      itemRenderer={renderMovieListItem}
      itemsEqual={areMoviesEqual}
      itemPredicate={filterMovie}
      createNewItemFromQuery={createMovie}
      createNewItemRenderer={renderCreateMovieListItem}
      getFieldProps={(value) => ({
        variant: 'outlined',
        label: 'Film',
        children: value?.title,
      })}
      {...props}
    />
  );
};
