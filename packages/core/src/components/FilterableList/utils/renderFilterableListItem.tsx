import type { IFilterableListItemRenderer } from '~/components/FilterableListBase';
import type { IFilterableListItem } from '../FilterableList.types';
import { ListItem } from '~/components/List/ListItem';
import { getFilterableListItemProps } from './getFilterableListItemProps';

/**
 * Basic list item renderer for "list" containers.
 */
export const renderFilterableListItem: IFilterableListItemRenderer<
  IFilterableListItem,
  HTMLButtonElement
> = (item, props) => {
  if (!props.modifiers.matchesPredicate) {
    return null;
  }

  const listItemProps = getFilterableListItemProps(item, props);

  return (
    <ListItem
      {...listItemProps}
      as="button"
      key={props.index}
      active={props.modifiers.active}
      selected={props.modifiers.selected}
      disabled={props.modifiers.disabled}
      hoverable
      {...props.getButtonAttributes()}
      tabIndex={props.modifiers.active ? 0 : -1}
      ref={props.buttonRef}
    />
  );
};
