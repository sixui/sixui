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
  areMoviesEqual,
  createMovie,
  filterMovie,
  renderCreateMovieListItem,
  renderMovieListItem,
  TOP_100_MOVIES,
  type IMovie,
} from '@/components/utils/FilteredList/movies';
import {
  maybeAddCreatedItemToArrays,
  maybeDeleteCreatedItemFromArrays,
} from '@/components/utils/FloatingFilteredList/utils';
import {
  executeFilteredItemsEqual,
  type IFilteredItemRenderer,
} from '@/components/utils/FilteredList';
import {
  FloatingFilteredList,
  type IFloatingFilteredListProps,
} from '@/components/utils/FloatingFilteredList';

export type ISuggestDemoProps = IFloatingFilteredListProps<
  IMovie,
  HTMLDivElement
> & {
  value?: IMovie;
  defaultValue?: IMovie;
  onChange: (value?: IMovie) => void;
};

export const SuggestDemo = (props: ISuggestDemoProps): React.ReactNode => {
  const { value, defaultValue, onChange, ...other } = props;
  const [items, setItems] = useState(TOP_100_MOVIES);
  const [createdItems, setCreatedItems] = useState<Array<IMovie>>([]);
  const [selectedItem, setSelectedItem] = useControlledValue({
    controlled: value,
    default: defaultValue,
    name: 'FloatingFilteredListDemo',
  });

  const canFilter = true;

  const handleItemSelect = (newSelectedItem: IMovie): number | undefined => {
    setSelectedItem(newSelectedItem);

    // Delete the old film from the list if it was newly created.
    const step1Result = maybeDeleteCreatedItemFromArrays(
      areMoviesEqual,
      items,
      createdItems,
      selectedItem,
    );

    // Add the new film to the list if it is newly created.
    const step2Result = maybeAddCreatedItemToArrays(
      areMoviesEqual,
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

  const itemRendererWrapper: IFilteredItemRenderer<IMovie, HTMLDivElement> = (
    item,
    itemProps,
    buttonRef,
    buttonAttributes,
  ): React.JSX.Element | null => {
    const selected = executeFilteredItemsEqual(
      areMoviesEqual,
      item,
      selectedItem,
    );

    return renderMovieListItem(
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
      items: Array<IMovie>,
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
    <FloatingFilteredList<IMovie, HTMLDivElement>
      {...other}
      // disabled
      onItemSelect={handleItemSelect}
      items={items}
      // createNewItemPosition='first'
      // defaultSelectedItem={TOP_100_MOVIES[3]}
      // selectedItem={TOP_100_MOVIES[3]}
      // defaultQuery='w'
      renderer={(listProps) => <MenuList>{listProps.filteredList}</MenuList>}
      itemRenderer={itemRendererWrapper}
      itemsEqual={areMoviesEqual}
      itemPredicate={canFilter ? filterMovie : undefined}
      noResults={<ListItem disabled>No results.</ListItem>}
      createNewItemFromQuery={createMovie}
      createNewItemRenderer={renderCreateMovieListItem}
      // itemDisabled={isMovieDisabled}
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
    </FloatingFilteredList>
  );
};
