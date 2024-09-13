import highlightWords from 'highlight-words';
import stylex from '@stylexjs/stylex';

import type {
  IFilterableListItem,
  IFilterableListProps,
} from './FilterableList.types';
import { MenuList } from '../MenuList';
import { TextInputField } from '../TextInputField';
import { ListItem, type IListItemProps } from '../ListItem';
import {
  FilterableListBase,
  type IFilterableListItemRenderer,
  type IFilterableListItemRendererProps,
  type IFilterableListPredicate,
} from '../FilterableListBase';
import { createFilter } from '~/helpers/createFilter';
import {
  filterableListItemFocusStyles,
  filterableListItemStyles,
} from './FilterableList.styles';

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
  { modifiers, query, focus }: IFilterableListItemRendererProps<TElement>,
): IListItemProps => {
  const text = item.label ?? item.value;

  return {
    disabled: modifiers.disabled,
    onClick: item.onClick,
    href: item.href,
    ...(focus === 'icon'
      ? {
          innerStyles: { item: filterableListItemFocusStyles },
          leading: undefined,
          leadingIcon: undefined,
          leadingImage: undefined,
          leadingVideo: undefined,
          supportingText: undefined,
          trailingSupportingText: undefined,
          children: item.icon ? (
            <div {...stylex.props(filterableListItemStyles.content$iconFocus)}>
              {item.icon}
            </div>
          ) : (
            item.label
          ),
        }
      : {
          leading: item.leading,
          leadingIcon: item.icon,
          leadingImage: item.imageUrl,
          leadingVideo: item.video,
          supportingText: highlightQueryInText(item.supportingText, query),
          trailingSupportingText: highlightQueryInText(
            item.trailingSupportingText,
            query,
          ),
          children: text
            ? typeof text === 'string'
              ? highlightQueryInText(text, query)
              : text
            : item.placeholder,
        }),
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
    getSearchableText: (item) => [
      typeof item.label === 'string' ? item.label : undefined,
      item.value,
      item.supportingText,
    ],
  });

export const getFilterableListItemLabel = (
  item: IFilterableListItem,
): React.ReactNode | undefined => item.label ?? item.value;

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
      tabIndex={props.modifiers.active ? 0 : -1}
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
          scale='sm'
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
      noResults={<ListItem disabled>No results.</ListItem>}
      {...other}
    />
  );
};
