import type { IFilterableListBaseExampleProps } from './FilterableListBaseExample.types';
import type { IMovie } from './movies';
import { ListItem } from '../ListItem';
import { MenuList } from '../MenuList';
import { TextInputField } from '../TextInputField';
import { FilterableListBase } from './FilterableListBase';
import {
  areMoviesEqual,
  createMovie,
  filterMovie,
  renderCreateMovieListItem,
  renderMovieListItem,
  TOP_100_MOVIES,
} from './movies';

export const FilterableListBaseExample: React.FC<
  IFilterableListBaseExampleProps
> = (props) => {
  const { canFilter, canCreate, ...other } = props;

  return (
    <FilterableListBase<IMovie, HTMLDivElement>
      items={TOP_100_MOVIES}
      renderer={(listProps) => (
        <MenuList
          scale="sm"
          header={
            canFilter ? (
              <TextInputField
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
