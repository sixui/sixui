import highlightWords from 'highlight-words';

import type { IOmit } from '@/helpers/types';
import { MenuList } from '@/components/atoms/MenuList';
import { TextInputField } from '@/components/atoms/TextInputField';
import { ListItem, type IListItemOwnProps } from '@/components/atoms/ListItem';
import {
  FilterableListBase,
  type IFilterableItemPredicate,
  type IFilterableItemRenderer,
  type IFilterableItemRendererProps,
  type IFilterableListBaseProps,
} from '@/components/atoms/FilterableListBase';

export type IFilterableListItem = {
  leading?: React.ReactNode;
  icon?: React.ReactNode;
  imageUrl?: string;
  video?: Array<{ type: string; src: string }>;
  label?: string;
  supportingText?: string;
  trailingSupportingText?: string;
  value: string;
  disabled?: boolean;
};

export type IFilterableListProps = IOmit<
  IFilterableListBaseProps<IFilterableListItem, HTMLElement>,
  'renderer' | 'itemRenderer'
> & {
  canFilter?: boolean;
};

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
  { modifiers, query }: IFilterableItemRendererProps<TElement>,
): IListItemOwnProps & React.HTMLAttributes<HTMLElement> => {
  const label = item.label ?? item.value;

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
    children: highlightQueryInText(label, query),
  };
};

/**
 * Compares two items for equality.
 */
export const areFilterableListItemsEqual = (
  itemA: IFilterableListItem,
  itemB: IFilterableListItem,
): boolean => itemA.value.toLowerCase() === itemB.value.toLowerCase();

/**
 * Filters movie list with a case-insensitive search.
 */
export const filterFilterableListItem: IFilterableItemPredicate<
  IFilterableListItem
> = (query, item, _index, exactMatch) => {
  const normalizedLabel = (item.label ?? item.value).toLowerCase();
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

export const getFilterableListItemLabel = (item: IFilterableListItem): string =>
  item.label ?? item.value;

export const isFilterableListItemDisabled = (
  item: IFilterableListItem,
): boolean => !!item.disabled;

/**
 * Basic list item renderer for "list" containers.
 */
export const renderFilterableListItem: IFilterableItemRenderer<
  IFilterableListItem,
  HTMLElement
> = (movie, props) => {
  if (!props.modifiers.matchesPredicate) {
    return null;
  }

  return (
    <ListItem
      {...getFilterableListItemProps(movie, props)}
      key={props.index}
      visualState={{ hovered: props.modifiers.active, strategy: 'replace' }}
      selected={props.modifiers.selected}
      disabled={props.modifiers.disabled}
      {...props.getButtonAttributes({
        onClick: props.handleClick,
      })}
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
      itemPredicate={filterFilterableListItem}
      noResults={<ListItem disabled>No results.</ListItem>}
      {...other}
    />
  );
};
