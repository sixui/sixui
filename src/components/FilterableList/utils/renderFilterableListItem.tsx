import type { IFilterableListItemRenderer } from '~/components/FilterableListBase';
import type { IFilterableListItem } from '../FilterableList.types';
import { ListItem } from '~/components/ListItem';
import { getFilterableListItemProps } from './getFilterableListItemProps';

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
      interactions={{ hovered: props.modifiers.active }}
      selected={props.modifiers.selected}
      disabled={props.modifiers.disabled}
      {...props.getButtonAttributes()}
      tabIndex={props.modifiers.active ? 0 : -1}
      ref={props.buttonRef}
    />
  );
};
