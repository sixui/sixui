import type { IFieldBaseProps } from '~/components/FieldBase';
import type { IUseSingleFilterableListBaseProps } from '~/components/FilterableListBase';
import type { IMovie } from '~/components/FilterableListBase/FilterableListBase.stories/movies';
import type { IFloatingFilterableListBaseProps } from '~/components/FloatingFilterableListBase';
import { FieldBase } from '~/components/FieldBase';
import {
  FilterableListBaseFieldTrailingIcon,
  useSingleFilterableListBase,
} from '~/components/FilterableListBase';
import {
  areMoviesEqual,
  createMovie,
  filterMovie,
  getMovieLabel,
  renderCreateMovieListItem,
  renderMovieListItem,
  TOP_100_MOVIES,
} from '~/components/FilterableListBase/FilterableListBase.stories/movies';
import { floatingFilterableListBaseFactory } from '~/components/FloatingFilterableListBase';
import { ListItem } from '~/components/List/ListItem';
import { MenuList } from '~/components/Menu/MenuList';
import { TextInput } from '~/components/TextInput';

export type IFloatingFilterableListBaseDemoProps = Partial<
  IFloatingFilterableListBaseProps<IMovie, HTMLDivElement>
> &
  Partial<IUseSingleFilterableListBaseProps<IMovie, HTMLElement>> &
  IFieldBaseProps & {
    canFilter?: boolean;
    canCreate?: boolean;
  };

const MovieFloatingFilterableListBase =
  floatingFilterableListBaseFactory<IMovie>();

export const FloatingFilterableListBaseDemo: React.FC<
  IFloatingFilterableListBaseDemoProps
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
              <TextInput
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
          {singleFilterableListBase.selectedItem &&
            getMovieLabel(singleFilterableListBase.selectedItem)}
        </FieldBase>
      )}
    </MovieFloatingFilterableListBase>
  );
};
