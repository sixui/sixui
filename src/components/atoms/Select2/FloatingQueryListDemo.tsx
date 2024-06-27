import { useState } from 'react';
import {
  FloatingQueryList,
  type IFloatingQueryListProps,
} from './FloatingQueryList';

import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ListItem } from '@/components/atoms/ListItem';
import { TextField } from '@/components/atoms/TextField';
import { MenuList } from '@/components/atoms/MenuList';
import { Field } from '@/components/atoms/Field';
import { useControlledValue } from '@/hooks/useControlledValue';
import {
  areFilmsEqual,
  createFilm,
  filterFilm,
  renderCreateFilmMenuItem,
  renderFilm,
  TOP_100_FILMS,
  type IFilm,
} from './films';
import {
  maybeAddCreatedItemToArrays,
  maybeDeleteCreatedItemFromArrays,
} from './utils';
import { executeItemsEqual, type IItemRenderer } from './ListItemProps';

export type IFloatingQueryListDemoProps = IFloatingQueryListProps<IFilm> & {
  value?: IFilm;
  defaultValue?: IFilm;
  onChange: (value: IFilm) => void;
};

// FIXME: should become Select component
export const FloatingQueryListDemo = (
  props: IFloatingQueryListDemoProps,
): React.ReactNode => {
  const { value, defaultValue, onChange, ...other } = props;
  const [items, setItems] = useState(TOP_100_FILMS);
  const [createdItems, setCreatedItems] = useState<Array<IFilm>>([]);
  const [selectedItem, setSelectedItem] = useControlledValue({
    controlled: value,
    default: defaultValue,
    name: 'FloatingQueryListDemo',
  });

  const canFilter = true;

  const handleItemSelect = (newSelectedItem: IFilm): number | undefined => {
    setSelectedItem(newSelectedItem);

    // Delete the old film from the list if it was newly created.
    const step1Result = maybeDeleteCreatedItemFromArrays(
      areFilmsEqual,
      items,
      createdItems,
      selectedItem,
    );

    // Add the new film to the list if it is newly created.
    const step2Result = maybeAddCreatedItemToArrays(
      areFilmsEqual,
      step1Result.items,
      step1Result.createdItems,
      newSelectedItem,
    );

    setCreatedItems(step2Result.createdItems);
    setItems(step2Result.items);
    onChange?.(newSelectedItem);

    const createdIndex = step2Result.createdItems.indexOf(newSelectedItem);
    const selectedIndex =
      createdIndex >= 0
        ? step2Result.items.length - 1 + createdIndex
        : undefined;

    return selectedIndex;
  };

  const itemRendererWrapper: IItemRenderer<IFilm> = (
    item,
    itemProps,
    buttonRef,
    buttonAttributes,
  ): React.ReactNode => {
    const selected = executeItemsEqual(areFilmsEqual, item, selectedItem);

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
      // itemDisabled={isFilmDisabled}
      matchTargetWidth
      resetOnSelect
      resetOnClose
      closeOnSelect
    >
      {(buttonProps) => (
        <Field
          as='button'
          placeholder='Choose a film'
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
          {selectedItem?.title}
        </Field>
      )}
    </FloatingQueryList>
  );
};
