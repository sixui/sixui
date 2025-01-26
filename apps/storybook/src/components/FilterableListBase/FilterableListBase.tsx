import { useEffect, useState } from 'react';

import type {
  IFilterableListBaseFactory,
  IFilterableListBaseInternalRenderer,
  IFilterableListItemModifiers,
} from './FilterableListBase.types';
import { Box } from '~/components/Box';
import { useControlledValue } from '~/hooks/useControlledValue';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import {
  executeFilterableItemsEqual,
  renderFilterableItems,
} from './FilterableListBaseUtils';
import { getFilterableItems } from './utils/getFilterableItems';
import { isItemDisabled } from './utils/isItemDisabled';

const COMPONENT_NAME = 'FilterableListBase';

export const filterableListBaseFactory = <
  TItem,
  TElement extends HTMLElement = HTMLElement,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
>() => {
  const FilterableListBase = polymorphicComponentFactory<
    IFilterableListBaseFactory<TItem, TElement>
  >((props, forwardedRef) => {
    const {
      items,
      query: queryProp,
      defaultQuery,
      createNewItemPosition,
      createNewItemFromQuery,
      createNewItemRenderer,
      itemsEqual,
      disabled,
      itemDisabled,
      itemRenderer,
      initialContent,
      noResults,
      renderer,
      onQueryChange,
      onItemSelect,
      itemPredicate,
      listPredicate,
      cols = 1,
      listRenderer,
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });
    const isCreateItemFirst = createNewItemPosition === 'first';
    const canCreateItems = !!createNewItemFromQuery && !!createNewItemRenderer;
    const [query, setQuery] = useControlledValue({
      controlled: queryProp,
      default: defaultQuery ?? '',
      name: COMPONENT_NAME,
    });
    const [filteredItems, setFilteredItems] = useState<Array<TItem>>(
      getFilterableItems(query, {
        items,
        itemPredicate,
        listPredicate,
      }),
    );

    useEffect(() => {
      setFilteredItems(
        getFilterableItems(query, {
          items,
          itemPredicate,
          listPredicate,
        }),
      );
    }, [query, items, itemPredicate, listPredicate]);

    const defaultListRenderer: IFilterableListBaseInternalRenderer<TItem> = (
      listProps,
    ): React.ReactNode => {
      // Omit noResults if createNewItemFromQuery and createNewItemRenderer are
      // both supplied, and query is not empty.
      const createItemView = listProps.renderCreateItem();
      const maybeNoResults = createItemView != null ? undefined : noResults;
      const menuContent = renderFilterableItems(
        listProps,
        maybeNoResults,
        initialContent,
      );
      if (menuContent == null && createItemView == null) {
        return undefined;
      }

      return (
        <>
          {isCreateItemFirst && createItemView}
          {menuContent}
          {!isCreateItemFirst && createItemView}
        </>
      );
    };
    const itemListRenderer = listRenderer ?? defaultListRenderer;

    // Search only the filtered items, not the full items list, because we
    // only need to check items that match the current query.
    const wouldCreatedItemMatchSomeExistingItem = (
      createNewItem: TItem | Array<TItem>,
    ): boolean =>
      filteredItems.some((item) => {
        const newItems = Array.isArray(createNewItem)
          ? createNewItem
          : [createNewItem];

        return newItems.some((newItem) =>
          executeFilterableItemsEqual(itemsEqual, item, newItem),
        );
      });

    const isCreateItemRendered = (
      createNewItem: TItem | Array<TItem>,
    ): boolean =>
      canCreateItems &&
      !!query.length &&
      // this check is unfortunately O(N) on the number of items, but
      // alas, hiding the "Create Item" option when it exactly matches an
      // existing item is much clearer.
      !wouldCreatedItemMatchSomeExistingItem(createNewItem);

    const handleQueryChange = (
      newQuery: string,
      event?: React.ChangeEvent<HTMLInputElement>,
    ): void => {
      if (query === newQuery) {
        return;
      }

      setQuery(newQuery);
      onQueryChange?.(newQuery, event);
    };

    const renderCreateItem = (): React.JSX.Element | null | undefined => {
      if (!query) {
        return undefined;
      }

      const createNewItem = createNewItemFromQuery?.(query);
      if (!createNewItem || !isCreateItemRendered(createNewItem)) {
        return null;
      }

      const trimmedQuery = query.trim();
      const modifiers: IFilterableListItemModifiers = {
        active: false,
        selected: false,
        disabled: false,
        matchesPredicate: false,
      };

      return createNewItemRenderer?.({
        index: filteredItems.length,
        modifiers,
        query: trimmedQuery,
        handleClick: (event) => {
          onItemSelect(createNewItem, event);
        },
        getButtonAttributes: (userProps) => ({ ...userProps }),
      });
    };

    const renderItem = (item: TItem, index: number): React.ReactNode => {
      const modifiers: IFilterableListItemModifiers = {
        active: false,
        selected: false,
        disabled: disabled || isItemDisabled(item, index, itemDisabled),
        matchesPredicate: filteredItems.includes(item),
      };

      return itemRenderer(item, {
        index,
        modifiers,
        query,
        handleClick: (event) => {
          onItemSelect(item, event);
        },
        getButtonAttributes: (userProps) => ({ ...userProps }),
      });
    };

    return (
      <Box ref={forwardedRef} {...other}>
        {renderer({
          filteredItems,
          query,
          filteredList: itemListRenderer({
            filteredItems,
            query,
            items,
            renderCreateItem,
            renderItem,
            cols,
          }),
          handleQueryChange: (value) => {
            handleQueryChange(value);
          },
          disabled,
          getInputFilterProps: (userProps) => ({ ...userProps }),
        })}
      </Box>
    );
  });

  FilterableListBase.displayName = `@sixui/${COMPONENT_NAME}`;

  return FilterableListBase;
};
