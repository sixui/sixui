import type { IOmit } from '@/helpers/types';
import { ListItem } from '@/components/atoms/ListItem';
import { TextField } from '@/components/atoms/TextField';
import { MenuList } from '@/components/atoms/MenuList';
import { FilteredList, type IFilteredListProps } from './FilteredList';
import {
  areMoviesEqual,
  createMovie,
  filterMovie,
  renderCreateMovieListItem,
  renderMovieListItem,
  TOP_100_MOVIES,
  type IMovie,
} from './movies';

export type IFilteredListExampleProps = IOmit<
  IFilteredListProps<IMovie, HTMLDivElement>,
  | 'items'
  | 'renderer'
  | 'itemRenderer'
  | 'itemsEqual'
  | 'itemPredicate'
  | 'noResults'
  | 'createNewItemFromQuery'
  | 'createNewItemRenderer'
> & {
  canFilter?: boolean;
  canCreate?: boolean;
};

export const FilteredListExample: React.FC<IFilteredListExampleProps> = (
  props,
) => {
  const { canFilter, canCreate, ...other } = props;

  return (
    <FilteredList<IMovie, HTMLDivElement>
      items={TOP_100_MOVIES}
      renderer={(listProps) => (
        <MenuList
          size='sm'
          header={
            canFilter ? (
              <TextField
                onChange={listProps.handleQueryChange}
                value={listProps.query}
                disabled={listProps.disabled}
                clearable
              />
            ) : undefined
          }
        >
          {listProps.filteredList}
        </MenuList>
      )}
      itemRenderer={renderMovieListItem}
      itemsEqual={areMoviesEqual}
      itemPredicate={filterMovie}
      noResults={<ListItem disabled>No results.</ListItem>}
      createNewItemFromQuery={canCreate ? createMovie : undefined}
      createNewItemRenderer={canCreate ? renderCreateMovieListItem : undefined}
      {...other}
    />
  );
};
