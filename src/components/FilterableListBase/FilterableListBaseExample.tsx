import type { IOmit } from '~/helpers/types';
import type { IFilterableListBaseProps } from './FilterableListBase.types';
import type { IMovie } from './movies';
import { ListItem } from '../ListItem';
import { MenuList } from '../MenuList';
import { TextInputField } from '../TextInputField';
import { filterableListBaseFactory } from './FilterableListBase';
import {
  areMoviesEqual,
  createMovie,
  filterMovie,
  renderCreateMovieListItem,
  renderMovieListItem,
  TOP_100_MOVIES,
} from './movies';

export type IFilterableListBaseExampleProps = IOmit<
  IFilterableListBaseProps<IMovie, HTMLDivElement>,
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

const MovieFilterableListBase = filterableListBaseFactory<
  IMovie,
  HTMLDivElement
>();

export const FilterableListBaseExample: React.FC<
  IFilterableListBaseExampleProps
> = (props) => {
  const { canFilter, canCreate, ...other } = props;

  return (
    <MovieFilterableListBase
      items={TOP_100_MOVIES}
      renderer={(listProps) => (
        <MenuList
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
