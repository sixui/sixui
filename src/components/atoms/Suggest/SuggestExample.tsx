import type { IOmit } from '@/helpers/types';
import {
  areMoviesEqual,
  createMovie,
  filterMovie,
  renderCreateMovieListItem,
  renderMovieListItem,
  TOP_100_MOVIES,
  type IMovie,
} from '@/components/atoms/FilteredList/movies';
import { Suggest, type ISuggestProps } from './Suggest';

export type ISuggestExampleProps = IOmit<
  ISuggestProps<IMovie>,
  'items' | 'itemRenderer'
> & {
  canCreate?: boolean;
};

export const SuggestExample = (
  props: ISuggestExampleProps,
): React.ReactNode => {
  const { canCreate, ...rest } = props;

  return (
    <Suggest<IMovie>
      items={TOP_100_MOVIES}
      itemRenderer={renderMovieListItem}
      itemsEqual={areMoviesEqual}
      itemPredicate={filterMovie}
      createNewItemFromQuery={canCreate ? createMovie : undefined}
      createNewItemRenderer={canCreate ? renderCreateMovieListItem : undefined}
      getTextFieldProps={(buttonProps, value) => ({
        value: buttonProps.isOpen
          ? buttonProps.query
          : buttonProps.query || value?.title,
        placeholder: value?.title,
      })}
      {...rest}
    />
  );
};
