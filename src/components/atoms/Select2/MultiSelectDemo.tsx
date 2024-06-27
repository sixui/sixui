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
import { Field } from '@/components/atoms/Field';
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

export type IMultiSelectDemoProps = IFloatingQueryListProps<IFilm> & {
  value?: Array<IFilm>;
  defaultValue?: Array<IFilm>;
  onChange: (value: Array<IFilm>) => void;
};

export const MultiSelectDemo: React.FC<IMultiSelectDemoProps> = (props) => {
  const { value, defaultValue, onChange, ...other } = props;
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

  return (
    <FloatingQueryList<IFilm>
      {...other}
      onItemSelect={handleItemSelect}
      items={items}
      // createNewItemPosition='first'
      // defaultSelectedItem={TOP_100_FILMS[3]}
      // selectedItem={TOP_100_FILMS[3]}
      // defaultQuery='w'
      renderer={(listProps) => (
        <MenuList
          header={
            canFilter ? (
              <TextField
                onChange={listProps.handleQueryChange}
                value={listProps.query}
                disabled={listProps.disabled}
                clearable
                {...listProps.inputFilterAttributes}
                ref={listProps.inputFilterRef}
              />
            ) : undefined
          }
        >
          {listProps.itemList}
        </MenuList>
      )}
      itemRenderer={itemRendererWrapper}
      itemsEqual={areFilmsEqual}
      itemPredicate={canFilter ? filterFilm : undefined}
      noResults={<ListItem disabled>No results.</ListItem>}
      createNewItemFromQuery={createFilm}
      createNewItemRenderer={renderCreateFilmMenuItem}
      itemDisabled={isFilmDisabled}
      matchTargetWidth
      // resetOnSelect
    >
      {(buttonProps) => (
        <Field
          as='button'
          placeholder='Choose films'
          end={
            buttonProps.isOpen ? (
              <TriangleUpIcon aria-hidden />
            ) : (
              <TriangleDownIcon aria-hidden />
            )
          }
          variant='outlined'
          {...buttonProps.buttonAttributes}
          ref={buttonProps.buttonRef}
        >
          <div
            {...stylex.props(commonStyles.horizontalLayout, commonStyles.wrap)}
          >
            {selectedItems?.map((item, itemIndex) => (
              <InputChip key={itemIndex} label={item.title} />
            ))}
          </div>
        </Field>
      )}
    </FloatingQueryList>
  );
};
