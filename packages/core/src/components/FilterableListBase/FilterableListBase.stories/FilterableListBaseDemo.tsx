import type { IOmit } from '~/utils/types';
import type { IFilterableListBaseProps } from '../FilterableListBase.types';
import type { IMovie } from './movies';
import { ListItem } from '~/components/List/ListItem';
import { MenuList } from '~/components/Menu/MenuList';
import { TextInputField } from '~/components/TextInputField';
import { filterableListBaseFactory } from '../FilterableListBase';
import {
  areMoviesEqual,
  createMovie,
  filterMovie,
  renderCreateMovieListItem,
  renderMovieListItem,
  TOP_100_MOVIES,
} from './movies';

export type IFilterableListBaseDemoProps = IOmit<
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

const MovieFilterableListBase = filterableListBaseFactory<IMovie>();

export const FilterableListBaseDemo: React.FC<IFilterableListBaseDemoProps> = (
  props,
) => {
  const { canFilter, canCreate, ...other } = props;

  return (
    <MovieFilterableListBase
      items={TOP_100_MOVIES}
      renderer={(listProps) => (
        <MenuList
          header={
            canFilter ? (
              <TextInputField
                onChange={(event) => {
                  listProps.handleQueryChange(event.target.value);
                }}
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
