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
  const { canCreate, ...other } = props;

  return (
    <Suggest<IMovie>
      items={TOP_100_MOVIES}
      itemRenderer={renderMovieListItem}
      itemsEqual={areMoviesEqual}
      itemPredicate={filterMovie}
      itemDisabled={isMovieDisabled}
      createNewItemFromQuery={canCreate ? createMovie : undefined}
      createNewItemRenderer={canCreate ? renderCreateMovieListItem : undefined}
      getValueFieldProps={(buttonProps, value) => ({
        value: buttonProps.isOpen
          ? buttonProps.query
          : buttonProps.query || (value?.title ?? ''),
        placeholder: value?.title,
      })}
      {...other}
    />
  );
};
