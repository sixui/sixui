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

export type IFilteredListExampleProps = IFilteredListProps<IMovie>;

export const FilteredListExample: React.FC<IFilteredListExampleProps> = (
  props,
) => {
  return (
    <FilteredList<IMovie>
      {...props}
      items={TOP_100_MOVIES}
      renderer={(listProps) => (
        <MenuList
          size='sm'
          header={
            <TextField
              onChange={listProps.handleQueryChange}
              value={listProps.query}
              disabled={listProps.disabled}
              clearable
            />
          }
        >
          {listProps.itemList}
        </MenuList>
      )}
      itemRenderer={renderMovieListItem}
      itemsEqual={areMoviesEqual}
      itemPredicate={filterMovie}
      noResults={<ListItem disabled>No results.</ListItem>}
      createNewItemFromQuery={createMovie}
      createNewItemRenderer={renderCreateMovieListItem}
    />
  );
};
