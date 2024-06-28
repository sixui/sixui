import { useState } from 'react';
import stylex from '@stylexjs/stylex';

import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ReactComponent as XMarkIcon } from '@/assets/XMark.svg';
import { ListItem } from '@/components/atoms/ListItem';
import { TextField } from '@/components/atoms/TextField';
import { MenuList } from '@/components/atoms/MenuList';
import { useControlledValue } from '@/hooks/useControlledValue';
import { commonStyles } from '@/helpers/commonStyles';
import { IconButton } from '@/components/atoms/IconButton';
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
import {
  FloatingQueryList,
  type IFloatingQueryListProps,
} from './FloatingQueryList';

export type ISuggestDemoProps = IFloatingQueryListProps<IFilm> & {
  value?: IFilm;
  defaultValue?: IFilm;
  onChange: (value?: IFilm) => void;
};

export const SuggestDemo = (props: ISuggestDemoProps): React.ReactNode => {
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

  const handleClear = (
    onItemsRemove: (
      items: Array<IFilm>,
      event?: React.SyntheticEvent<HTMLElement>,
    ) => void,
    event?: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    event?.stopPropagation();
    if (selectedItem) {
      onChange?.(undefined);
      onItemsRemove([selectedItem], event);
      setSelectedItem(undefined);
    }
  };

  return (
    <FloatingQueryList<IFilm>
      {...other}
      // disabled
      onItemSelect={handleItemSelect}
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
      // itemDisabled={isFilmDisabled}
      matchTargetWidth
      resetOnSelect
      resetOnClose
      closeOnSelect
      initialFocus={-1}
    >
      {(buttonProps) => (
        <TextField
          end={
            <div
              {...stylex.props(
                commonStyles.horizontalLayout,
                commonStyles.gap$none,
              )}
            >
              {selectedItem ? (
                <IconButton
                  icon={<XMarkIcon aria-hidden />}
                  onClick={(event) =>
                    handleClear(buttonProps.onItemsRemove, event)
                  }
                />
              ) : null}
              <IconButton
                tabIndex={-1}
                icon={
                  buttonProps.isOpen ? (
                    <TriangleUpIcon aria-hidden />
                  ) : (
                    <TriangleDownIcon aria-hidden />
                  )
                }
              />
            </div>
          }
          variant='outlined'
          label='Label'
          populated={
            buttonProps.isOpen || !!selectedItem || !!buttonProps.query
          }
          {...buttonProps.getInputFilterAttributes(
            buttonProps.getButtonAttributes({
              value: buttonProps.isOpen
                ? buttonProps.query
                : buttonProps.query || selectedItem?.title,
              placeholder: selectedItem?.title,
            }),
          )}
          ref={buttonProps.buttonRef}
          inputRef={buttonProps.inputFilterRef}
        />
      )}
    </FloatingQueryList>
  );
};
