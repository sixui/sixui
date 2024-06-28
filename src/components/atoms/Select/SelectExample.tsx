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
> & {
  canCreate?: boolean;
};

export const SelectExample = (props: ISelectExampleProps): React.ReactNode => {
  const { canCreate, ...rest } = props;

  return (
    <Select<IMovie>
      items={TOP_100_MOVIES}
      itemRenderer={renderMovieListItem}
      itemsEqual={areMoviesEqual}
      itemPredicate={filterMovie}
      createNewItemFromQuery={canCreate ? createMovie : undefined}
      createNewItemRenderer={canCreate ? renderCreateMovieListItem : undefined}
      getFieldProps={(value) => ({
        variant: 'outlined',
        label: 'Choose a film',
        children: value?.title,
      })}
      {...rest}
    />
  );
};
