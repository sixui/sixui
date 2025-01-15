import { Children, isValidElement, useCallback, useState } from 'react';

import type { IBreadcrumbsThemeFactory } from './Breadcrumbs.css';
import type { IBreadcrumbsFactory } from './Breadcrumbs.types';
import { iconEllipsisHorizontal } from '~/assets/icons';
import { isProduction } from '~/helpers/isProduction';
import { isFragment } from '~/helpers/react/isFragment';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { IconButton } from '../IconButton';
import { SvgIcon } from '../SvgIcon';
import { breadcrumbsTheme } from './Breadcrumbs.css';

const COMPONENT_NAME = 'Breadcrumbs';

export const Breadcrumbs = componentFactory<IBreadcrumbsFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      expandText,
      expandIcon = <SvgIcon icon={iconEllipsisHorizontal} />,
      itemCountBeforeCollapse = 1,
      itemCountAfterCollapse = 1,
      maxItems = 8,
      separator = '/',
      showTrailingSeparator,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const [expanded, setExpanded] = useState(false);

    const { getStyles } = useComponentTheme<IBreadcrumbsThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: breadcrumbsTheme,
    });

    const insertSeparators = useCallback(
      (items: Array<React.JSX.Element>): Array<React.JSX.Element> =>
        items.reduce(
          (acc, current, index) =>
            index < items.length - (showTrailingSeparator ? 0 : 1)
              ? [
                  ...acc,
                  current,
                  <li
                    aria-hidden
                    key={`separator-${index}`}
                    {...getStyles(['item', 'separator'])}
                  >
                    {separator}
                  </li>,
                ]
              : [...acc, current],
          [] as Array<React.JSX.Element>,
        ),
      [getStyles, separator, showTrailingSeparator],
    );

    const renderItemsBeforeAndAfter = (
      items: Array<React.JSX.Element>,
    ): Array<React.JSX.Element> => {
      const handleClickExpand = (): void => {
        if (expanded) {
          return;
        }

        setExpanded(true);
      };

      // This defends against someone passing weird input, to ensure that if all
      // items would be shown anyway, we just show all items without the EllipsisItem
      if (itemCountBeforeCollapse + itemCountAfterCollapse >= items.length) {
        if (!isProduction()) {
          // eslint-disable-next-line no-console
          console.error(
            [
              'sixui: You have provided an invalid combination of props to the Breadcrumbs.',
              `itemCountBeforeCollapse (${itemCountBeforeCollapse}) + itemCountAfterCollapse (${itemCountAfterCollapse}) >= maxItems (${maxItems})`,
            ].join('\n'),
          );
        }

        return items;
      }

      return [
        ...items.slice(0, itemCountBeforeCollapse),
        <li key="ellipsis" {...getStyles(['item', 'more'])}>
          <IconButton
            aria-label={expandText}
            onClick={handleClickExpand}
            icon={expandIcon}
          />
        </li>,
        ...items.slice(items.length - itemCountAfterCollapse, items.length),
      ];
    };

    const allItems = Children.toArray(children)
      .filter(isValidElement)
      .filter((child) => {
        if (isFragment(child)) {
          if (!isProduction()) {
            // eslint-disable-next-line no-console
            console.error(
              "sixui: The Breadcrumbs component doesn't accept a Fragment as a child. Consider providing an array instead.",
            );
          }

          return false;
        }

        return true;
      })
      .map((child, index) => (
        <li {...getStyles('item')} key={`child-${index}`}>
          {child}
        </li>
      ));

    return (
      <Box as="ol" {...getStyles('root')} ref={forwardedRef} {...other}>
        {insertSeparators(
          expanded || (maxItems !== undefined && allItems.length <= maxItems)
            ? allItems
            : renderItemsBeforeAndAfter(allItems),
        )}
      </Box>
    );
  },
);

Breadcrumbs.theme = breadcrumbsTheme;
Breadcrumbs.displayName = `@sixui/${COMPONENT_NAME}`;
