import {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { IBreadcrumbsProps } from './Breadcrumbs.types';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { isProduction } from '~/helpers/isProduction';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { isFragment } from '~/helpers/react/isFragment';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { ButtonBase } from '~/components/ButtonBase';
import { SvgIcon } from '~/components/SvgIcon';
import { iconEllipsisHorizontal } from '~/assets/icons';
import {
  breadcrumbsExpandButtonFocusRingStyles,
  breadcrumbsStyles,
} from './Breadcrumbs.styles';
import { breadscrumbsTheme } from './Breadcrumbs.stylex';

export const Breadcrumbs = forwardRef<HTMLOListElement, IBreadcrumbsProps>(
  function Breadcrumbs(props, forwardedRef) {
    const {
      styles,
      sx,
      innerStyles,
      children,
      expandText = 'Show path',
      itemCountBeforeCollapse = 1,
      itemCountAfterCollapse = 1,
      maxItems = 8,
      separator = '/',
      showTrailingSeparator: trailing,
      ...other
    } = props;

    const componentTheme = useComponentTheme('Breadcrumbs');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(breadcrumbsStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    const [expanded, setExpanded] = useState(false);

    const insertSeparators = useCallback(
      (items: Array<JSX.Element>): Array<JSX.Element> =>
        items.reduce(
          (acc, current, index) =>
            index < items.length - (trailing ? 0 : 1)
              ? [
                  ...acc,
                  current,
                  <li
                    aria-hidden
                    key={`separator-${index}`}
                    {...sxf('item', 'separator')}
                  >
                    {separator}
                  </li>,
                ]
              : [...acc, current],
          [] as Array<JSX.Element>,
        ),
      [sxf, separator, trailing],
    );

    const renderItemsBeforeAndAfter = (
      items: Array<JSX.Element>,
    ): Array<JSX.Element> => {
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
        <li key='ellipsis' {...sxf('item')}>
          <ButtonBase
            sx={breadcrumbsStyles.expandButton}
            styles={innerStyles?.expandButton}
            innerStyles={{
              focusRing: [
                breadcrumbsExpandButtonFocusRingStyles,
                ...asArray(innerStyles?.expandButtonFocusRing),
              ],
            }}
            aria-label={expandText}
            key='ellipsis'
            onClick={handleClickExpand}
          >
            <SvgIcon
              sx={stylesCombinator('icon')}
              icon={iconEllipsisHorizontal}
            />
          </ButtonBase>
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
        <li {...sxf('item')} key={`child-${index}`}>
          {child}
        </li>
      ));

    return (
      <ol
        {...other}
        {...sxf(breadscrumbsTheme, componentTheme.overridenStyles, 'host', sx)}
        ref={forwardedRef}
      >
        {insertSeparators(
          expanded || (maxItems !== undefined && allItems.length <= maxItems)
            ? allItems
            : renderItemsBeforeAndAfter(allItems),
        )}
      </ol>
    );
  },
);
