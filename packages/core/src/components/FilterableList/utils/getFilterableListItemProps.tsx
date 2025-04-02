import type { IListItemProps } from '~/components/List/ListItem';
import type { IFilterableListItemRendererProps } from '../../FilterableListBase';
import type { IFilterableListItem } from '../FilterableList.types';
import { Box } from '~/components/Box';
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
    ...(focus === 'icon'
      ? {
          leading: undefined,
          leadingIcon: undefined,
          leadingImage: undefined,
          leadingVideo: undefined,
          supportingText: undefined,
          trailingSupportingText: undefined,
          children: <Box ta="center">{item.icon ?? item.label}</Box>,
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
