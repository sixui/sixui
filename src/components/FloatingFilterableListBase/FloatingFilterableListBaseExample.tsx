import type { IFieldBaseProps } from '../FieldBase';
import type { IUseSingleFilterableListBaseProps } from '../FilterableListBase';
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

export type IFloatingFilterableListBaseExampleProps = Partial<
  IFloatingFilterableListBaseProps<IMovie, HTMLDivElement>
> &
  Partial<IUseSingleFilterableListBaseProps<IMovie, HTMLElement>> &
  IFieldBaseProps & {
    canFilter?: boolean;
    canCreate?: boolean;
  };

const MovieFloatingFilterableListBase = floatingFilterableListBaseFactory<
  IMovie,
  HTMLDivElement
>();

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
    <MovieFloatingFilterableListBase
      items={singleFilterableListBase.items}
      renderer={(listProps) => (
        <MenuList
          noFocusRing
          header={
            canFilter && (
              <TextInputField
                {...listProps.getInputFilterProps()}
                clearable
                type="text"
                ref={listProps.inputFilterRef}
                spellCheck="false"
              />
            )
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
      resetOnClose={canFilter}
      closeOnSelect
      matchTargetWidth
      forwardProps
      {...other}
    >
      {(renderProps) => (
        <FieldBase
          role="button"
          trailingIcon={
            <FilterableListBaseFieldTrailingIcon opened={renderProps.opened} />
          }
          populated={
            renderProps.opened || !!singleFilterableListBase.selectedItem
          }
          disabled={other.disabled}
          tabIndex={0}
          withoutRippleEffect
          wrapperProps={renderProps.getTriggerProps()}
          containerRef={renderProps.setTriggerRef}
          interactions={{ focused: renderProps.opened && !canFilter }}
          {...renderProps.forwardedProps}
        >
          {singleFilterableListBase.selectedItem
            ? getMovieLabel(singleFilterableListBase.selectedItem)
            : null}
        </FieldBase>
      )}
    </MovieFloatingFilterableListBase>
  );
};
