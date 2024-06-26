import { ListItem } from '@/components/atoms/ListItem';
import { TextField } from '@/components/atoms/TextField';
import { MenuList } from '@/components/atoms/MenuList';
import { QueryList, type IQueryListProps } from './QueryList';
import {
  areFilmsEqual,
  createFilm,
  filterFilm,
  renderCreateFilmMenuItem,
  renderFilm,
  TOP_100_FILMS,
  type IFilm,
} from './films';

export type IQueryListDemoProps = IQueryListProps<IFilm>;

export const QueryListDemo: React.FC<IQueryListDemoProps> = (props) => {
  return (
    <QueryList<IFilm>
      {...props}
      items={TOP_100_FILMS}
      renderer={(listProps) => (
        <MenuList
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
      itemRenderer={renderFilm}
      itemsEqual={areFilmsEqual}
      itemPredicate={filterFilm}
      noResults={<ListItem disabled>No results.</ListItem>}
      createNewItemFromQuery={createFilm}
      createNewItemRenderer={renderCreateFilmMenuItem}
    />
  );
};
