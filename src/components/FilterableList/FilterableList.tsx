import highlightWords from 'highlight-words';

import type {
  IFilterableListItem,
  IFilterableListProps,
} from './FilterableList.types';
import { MenuList } from '@/components/MenuList';
import { TextInputField } from '@/components/TextInputField';
import { ListItem, type IListItemOwnProps } from '@/components/ListItem';
import {
  FilterableListBase,
  type IFilterableListItemRenderer,
  type IFilterableListItemRendererProps,
  type IFilterableListPredicate,
  type IFilterableListItemPredicate,
} from '@/components/FilterableListBase';
import { createFilter } from '@/helpers/createFilter';

const highlightQueryInText = (
  text?: string,
  query?: string,
): React.ReactNode =>
  query && text
    ? highlightWords({
        text,
        query,
      }).map((chunk, index) =>
        chunk.match ? (
          <strong key={index}>{chunk.text}</strong>
        ) : (
          <span key={index}>{chunk.text}</span>
        ),
      )
    : text;

/**
 * Takes the same arguments as
 * `IFilterableItemRenderer<IFilterableListItem>`, but returns the common
 * menu item props for that item instead of the rendered element itself. This is
 * useful for implementing custom item renderers.
 */
const getFilterableListItemProps = <TElement extends HTMLElement>(
  item: IFilterableListItem,
  { modifiers, query }: IFilterableListItemRendererProps<TElement>,
): IListItemOwnProps => {
  const text = item.label ?? item.value;

  return {
    disabled: modifiers.disabled,
    leading: item.leading,
    leadingIcon: item.icon,
    leadingImage: item.imageUrl,
    leadingVideo: item.video,
    supportingText: highlightQueryInText(item.supportingText, query),
    trailingSupportingText: highlightQueryInText(
      item.trailingSupportingText,
      query,
    ),
    children: text ? highlightQueryInText(text, query) : item.placeholder,
    onClick: item.onClick,
    href: item.href,
  };
};

/**
 * Compares two items for equality.
 */
export const areFilterableListItemsEqual = (
  itemA: IFilterableListItem,
  itemB: IFilterableListItem,
): boolean => itemA.value === itemB.value;

/**
 * Checks if a list item is a placeholder for an empty value. Used, for example,
 * to determine if we should hide or show the "clear" button.
 */
export const isFilterableListItemEmpty = (item: IFilterableListItem): boolean =>
  !item.value;

export const filterFilterableList: IFilterableListPredicate<IFilterableListItem> =
  createFilter<IFilterableListItem>({
    getSearchableText: (item) => [item.label, item.value, item.supportingText],
  });

/**
 * Filters item list with a case-insensitive search.
 */
export const filterFilterableListItem: IFilterableListItemPredicate<
  IFilterableListItem
> = (item, query, _index, exactMatch) => {
  const text = item.label ?? item.value;
  if (!text || !query) {
    return false;
  }

  const normalizedLabel = text?.toLowerCase();
  const normalizedSupportingText = item.supportingText?.toLowerCase();
  const normalizedTrailingSupportingText =
    item.trailingSupportingText?.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  return exactMatch
    ? normalizedLabel === normalizedQuery
    : `${normalizedLabel} ${normalizedSupportingText ?? ''} ${normalizedTrailingSupportingText ?? ''}`.indexOf(
        normalizedQuery,
      ) >= 0;
};

export const getFilterableListItemLabel = (
  item: IFilterableListItem,
): string | undefined => item.label ?? item.value;

export const isFilterableListItemDisabled = (
  item: IFilterableListItem,
): boolean => !!item.disabled;

/**
 * Basic list item renderer for "list" containers.
 */
export const renderFilterableListItem: IFilterableListItemRenderer<
  IFilterableListItem,
  HTMLElement
> = (item, props) => {
  if (!props.modifiers.matchesPredicate) {
    return null;
  }

  const listItemProps = getFilterableListItemProps(item, props);

  return (
    <ListItem
      {...listItemProps}
      key={props.index}
      visualState={{ hovered: props.modifiers.active, strategy: 'replace' }}
      selected={props.modifiers.selected}
      disabled={props.modifiers.disabled}
      {...props.getButtonAttributes()}
      ref={props.buttonRef}
    />
  );
};

export const FilterableList: React.FC<IFilterableListProps> = (
  props: IFilterableListProps,
) => {
  const { canFilter, ...other } = props;

  return (
    <FilterableListBase<IFilterableListItem>
      renderer={(listProps) => (
        <MenuList
          size='sm'
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
      itemRenderer={renderFilterableListItem}
      itemsEqual={areFilterableListItemsEqual}
      listPredicate={filterFilterableList}
      itemPredicate={filterFilterableListItem}
      noResults={<ListItem disabled>No results.</ListItem>}
      {...other}
    />
  );
};