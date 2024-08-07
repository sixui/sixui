import type { IFilterableListBaseExampleProps } from './FilterableListBaseExample.types';
import { ListItem } from '../ListItem';
import { TextInputField } from '../TextInputField';
import { MenuList } from '../MenuList';
import { FilterableListBase } from './FilterableListBase';
import {
  areMoviesEqual,
  createMovie,
  filterMovie,
  renderCreateMovieListItem,
  renderMovieListItem,
  TOP_100_MOVIES,
  type IMovie,
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
          size='sm'
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
