import type { IOmit } from '~/helpers/types';
import type { IMovie } from '../FilterableListBase/movies';
import type { IFloatingFilterableListBaseProps } from '../FloatingFilterableListBase';
import { FieldBase } from '../FieldBase';
import {
  FilterableListBaseFieldTrailingIcon,
  useSingleFilterableListBase,
} from '../FilterableListBase';
import {
  areMoviesEqual,
  createMovie,
  filterMovie,
  getMovieLabel,
  renderCreateMovieListItem,
  renderMovieListItem,
  TOP_100_MOVIES,
} from '../FilterableListBase/movies';
import { floatingFilterableListBaseFactory } from '../FloatingFilterableListBase';
import { ListItem } from '../ListItem';
import { MenuList } from '../MenuList';
import { TextInputField } from '../TextInputField';

export type IFloatingFilterableListBaseExampleProps = IOmit<
  IFloatingFilterableListBaseProps<IMovie, HTMLDivElement>,
  | 'items'
  | 'renderer'
  | 'itemRenderer'
  | 'itemsEqual'
  | 'itemPredicate'
  | 'noResults'
  | 'createNewItemFromQuery'
  | 'createNewItemRenderer'
  | 'onItemSelect'
> & {
  canFilter?: boolean;
  canCreate?: boolean;
  selectedItem?: IMovie;
  defaultItem?: IMovie;
  itemEmpty?: (item: IMovie) => boolean;
  onItemChange?: (item?: IMovie) => void;
};

export const FloatingFilterableListBaseExample: React.FC<
  IFloatingFilterableListBaseExampleProps
> = (props) => {
  const {
    canFilter,
    canCreate,
    selectedItem,
    defaultItem,
    itemEmpty,
    onItemChange,
    ...other
  } = props;

  const FloatingFilterableListBase = floatingFilterableListBaseFactory<
    IMovie,
    HTMLDivElement
  >();

  const singleFilterableListBase = useSingleFilterableListBase({
    items: TOP_100_MOVIES,
    itemRenderer: renderMovieListItem,
    selectedItem,
    defaultItem,
    itemEmpty,
    itemsEqual: areMoviesEqual,
    onItemChange,
  });

  return (
    <FloatingFilterableListBase
      items={singleFilterableListBase.items}
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
      itemRenderer={singleFilterableListBase.itemRenderer}
      itemsEqual={areMoviesEqual}
      itemPredicate={filterMovie}
      noResults={<ListItem disabled>No results.</ListItem>}
      createNewItemFromQuery={canCreate ? createMovie : undefined}
      createNewItemRenderer={canCreate ? renderCreateMovieListItem : undefined}
      onItemSelect={singleFilterableListBase.handleItemSelect}
      {...other}
    >
      {(renderProps) => (
        <FieldBase
          trailingIcon={
            <FilterableListBaseFieldTrailingIcon opened={renderProps.opened} />
          }
          populated={
            renderProps.opened || !!singleFilterableListBase.selectedItem
          }
          disabled={other.disabled}
          tabIndex={0}
          wrapperProps={renderProps.getTriggerProps()}
          containerRef={renderProps.setTriggerRef}
          {...renderProps.forwardedProps}
        >
          {singleFilterableListBase.selectedItem
            ? getMovieLabel(singleFilterableListBase.selectedItem)
            : null}
        </FieldBase>
      )}
    </FloatingFilterableListBase>
  );
};
