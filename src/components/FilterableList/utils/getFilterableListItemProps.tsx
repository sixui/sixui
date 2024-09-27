import type { IFilterableListItemRendererProps } from '../../FilterableListBase';
import type { IListItemProps } from '../../ListItem';
import type { IFilterableListItem } from '../FilterableList.types';
import { highlightQueryInText } from './highlightQueryInText';

/**
 * Takes the same arguments as `IFilterableItemRenderer<IFilterableListItem>`,
 * but returns the common menu item props for that item instead of the rendered
 * element itself. This is useful for implementing custom item renderers.
 */
export const getFilterableListItemProps = <TElement extends HTMLElement>(
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
          // FIXME:
          // -> fontSize: listItemTokens.leadingIconSize,
          // innerStyles: { item: filterableListItemFocusStyles },
          leading: undefined,
          leadingIcon: undefined,
          leadingImage: undefined,
          leadingVideo: undefined,
          supportingText: undefined,
          trailingSupportingText: undefined,
          // FIXME:
          // -> content: { textAlign: 'center' }
          // -> supportingText: { textAlign: 'center' }
          children: item.icon
            ? // <div {...stylex.props(filterableListItemStyles.content$iconFocus)}>
              //   {item.icon}
              // </div>
              item.icon
            : item.label,
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
