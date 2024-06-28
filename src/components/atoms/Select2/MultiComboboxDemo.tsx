import { useState } from 'react';
import stylex from '@stylexjs/stylex';
import {
  FloatingQueryList,
  type IFloatingQueryListProps,
} from './FloatingQueryList';

import type { IItemRenderer } from './ListItemProps';
import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ListItem } from '@/components/atoms/ListItem';
import { TextField } from '@/components/atoms/TextField';
import { MenuList } from '@/components/atoms/MenuList';
import { InputChip } from '@/components/atoms/Chip';
import { useControlledValue } from '@/hooks/useControlledValue';
import {
  areFilmsEqual,
  createFilm,
  filterFilm,
  isFilmDisabled,
  renderCreateFilmMenuItem,
  renderFilm,
  TOP_100_FILMS,
  type IFilm,
} from './films';
import {
  arrayContainsItem,
  maybeAddCreatedItemToArrays,
  maybeDeleteCreatedItemFromArrays,
} from './utils';
import { commonStyles } from '@/helpers/commonStyles';

export type IMultiComboboxDemoProps = IFloatingQueryListProps<IFilm> & {
  value?: Array<IFilm>;
  defaultValue?: Array<IFilm>;
  onChange: (value: Array<IFilm>) => void;

  /**
   * Callback invoked when an item is removed from the selection by
   * removing its tag in the TagInput. This is generally more useful than
   * `tagInputProps.onRemove`  because it receives the removed value instead of
   * the value's rendered `ReactNode` tag.
   *
   * It is not recommended to supply _both_ this prop and `tagInputProps.onRemove`.
   */
  onRemove?: (value: IFilm, index: number) => void;
};

export const MultiComboboxDemo: React.FC<IMultiComboboxDemoProps> = (props) => {
  const { value, defaultValue, onChange, onRemove, ...other } = props;
  const [items, setItems] = useState(TOP_100_FILMS);
  const [createdItems, setCreatedItems] = useState<Array<IFilm>>([]);
  const [selectedItems, setSelectedItems] = useControlledValue({
    controlled: value,
    default: defaultValue,
    name: 'FloatingQueryListDemo',
  });

  const canFilter = true;

  const getSelectedFilmIndex = (film: IFilm): number => {
    const index = selectedItems?.indexOf(film);

    return index !== undefined && index >= 0 ? index : -1;
  };

  const isFilmSelected = (film: IFilm): boolean =>
    getSelectedFilmIndex(film) >= 0;

  const selectFilms = (filmsToSelect: Array<IFilm>): Array<IFilm> => {
    let nextCreatedItems = createdItems.slice();
    let nextFilms = selectedItems ? selectedItems.slice() : [];
    let nextItems = items.slice();

    filmsToSelect.forEach((filmToSelect) => {
      const results = maybeAddCreatedItemToArrays(
        areFilmsEqual,
        nextItems,
        nextCreatedItems,
        filmToSelect,
      );
      nextItems = results.items;
      nextCreatedItems = results.createdItems;
      // Avoid re-creating an item that is already selected (the "Create
      // Item" option will be shown even if it matches an already selected
      // item).
      nextFilms = !arrayContainsItem(areFilmsEqual, nextFilms, filmToSelect)
        ? [...nextFilms, filmToSelect]
        : nextFilms;
    });

    setCreatedItems(nextCreatedItems);
    setSelectedItems(nextFilms);
    setItems(nextItems);

    return nextFilms;
  };

  const selectFilm = (filmToSelect: IFilm): Array<IFilm> =>
    selectFilms([filmToSelect]);

  const deselectFilm = (index: number): Array<IFilm> => {
    const film = selectedItems?.[index];
    const { createdItems: nextCreatedItems, items: nextItems } =
      maybeDeleteCreatedItemFromArrays(
        areFilmsEqual,
        items,
        createdItems,
        film,
      );
    const nextSelectedItems =
      selectedItems?.filter((_film, i) => i !== index) ?? [];

    setCreatedItems(nextCreatedItems);
    setSelectedItems(nextSelectedItems);
    setItems(nextItems);

    return nextSelectedItems;
  };

  const handleItemSelect = (selectedItem: IFilm): undefined => {
    if (isFilmSelected(selectedItem)) {
      const selectedIndex = getSelectedFilmIndex(selectedItem);
      if (selectedIndex !== undefined) {
        onChange(deselectFilm(selectedIndex));
      }
    } else {
      onChange(selectFilm(selectedItem));
    }

    return undefined;
  };

  const itemRendererWrapper: IItemRenderer<IFilm> = (
    item,
    itemProps,
    buttonRef,
    buttonAttributes,
  ): React.ReactNode => {
    const selected = arrayContainsItem(
      areFilmsEqual,
      selectedItems ?? [],
      item,
    );

    return renderFilm(
      item,
      {
        ...itemProps,
        modifiers: {
          ...itemProps.modifiers,
          selected,
        },
      },
      buttonRef,
      buttonAttributes,
    );
  };

  const handleItemRemove = (item: IFilm, index: number): void => {
    onChange(deselectFilm(index));
    onRemove?.(item, index);
  };

  return (
    <FloatingQueryList<IFilm>
      {...other}
      onItemSelect={handleItemSelect}
      onItemRemove={handleItemRemove}
      items={items}
      // createNewItemPosition='first'
      // defaultSelectedItem={TOP_100_FILMS[3]}
      // selectedItem={TOP_100_FILMS[3]}
      // defaultQuery='w'
      renderer={(listProps) => <MenuList>{listProps.itemList}</MenuList>}
      itemRenderer={itemRendererWrapper}
      itemsEqual={areFilmsEqual}
      itemPredicate={canFilter ? filterFilm : undefined}
      noResults={<ListItem disabled>No results.</ListItem>}
      createNewItemFromQuery={createFilm}
      createNewItemRenderer={renderCreateFilmMenuItem}
      itemDisabled={isFilmDisabled}
      matchTargetWidth
      // resetOnSelect
      initialFocus={-1}
    >
      {(buttonProps) => (
        <TextField
          end={
            buttonProps.isOpen ? (
              <TriangleUpIcon aria-hidden />
            ) : (
              <TriangleDownIcon aria-hidden />
            )
          }
          variant='outlined'
          label='Label'
          populated={
            buttonProps.isOpen || !!selectedItems?.length || !!buttonProps.query
          }
          // FIXME: make clearable
          clearable
          // FIXME: test disabled
          // disabled={listProps.disabled}
          // FIXME:
          {...buttonProps.buttonAttributes({
            onChange: buttonProps.handleQueryChange,
          })}
          ref={buttonProps.buttonRef}
        >
          <div
            {...stylex.props(commonStyles.horizontalLayout, commonStyles.wrap)}
          >
            {selectedItems?.map((item, index) => (
              <InputChip
                key={index}
                label={item.title}
                onDelete={(event) => {
                  event.stopPropagation();
                  buttonProps.onItemRemove(item, index, event);
                }}
              />
            ))}
          </div>
        </TextField>
      )}
    </FloatingQueryList>
  );
};
