import {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
} from '@/helpers/types';
import type {
  IBreadcrumbsStyleKey,
  IBreadcrumbsStyleVarKey,
} from './Breadcrumbs.styledefs';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { isProduction } from '@/helpers/isProduction';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { isFragment } from '@/helpers/isFragment';
import { useComponentTheme } from '@/hooks/useComponentTheme';

import { ReactComponent as EllipsisHorizontal } from '@/assets/EllipsisHorizontal.svg';
import { ButtonBase } from '../Button';

export type IBreadcrumbsProps = IContainerProps<IBreadcrumbsStyleKey> & {
  innerStyles?: {
    expandButton?: IZeroOrMore<ICompiledStyles<IBreadcrumbsStyleKey>>;
    expandButtonFocusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
  };
  children: React.ReactNode;
  expandText?: string;
  itemCountBeforeCollapse?: number;
  itemCountAfterCollapse?: number;
  maxItems?: number;
  separator?: React.ReactNode;
  trailing?: boolean;
  'aria-label'?: string;
};

export const Breadcrumbs = forwardRef<HTMLOListElement, IBreadcrumbsProps>(
  function Breadcrumbs(props, ref) {
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
      trailing,
      ...other
    } = props;

    const { theme } = useComponentTheme('Breadcrumbs');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const styleProps = useMemo(
      () =>
        stylePropsFactory<IBreadcrumbsStyleKey, IBreadcrumbsStyleVarKey>(
          stylesCombinator,
        ),
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
                    {...styleProps(['item', 'separator'])}
                  >
                    {separator}
                  </li>,
                ]
              : [...acc, current],
          [] as Array<JSX.Element>,
        ),
      [styleProps, separator, trailing],
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
        if (process.env.NODE_ENV !== 'production') {
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
        <li key='ellipsis' {...styleProps(['item'])}>
          <ButtonBase
            styles={[
              theme.expandButtonStyles,
              ...asArray(innerStyles?.expandButton),
            ]}
            innerStyles={{
              focusRing: [
                theme.expandButtonFocusRingStyles,
                ...asArray(innerStyles?.expandButtonFocusRing),
              ],
            }}
            aria-label={expandText}
            key='ellipsis'
            onClick={handleClickExpand}
          >
            <EllipsisHorizontal {...styleProps(['icon'])} aria-hidden />
          </ButtonBase>
        </li>,
        ...items.slice(items.length - itemCountAfterCollapse, items.length),
      ];
    };

    const allItems = Children.toArray(children)
      .filter((child) => {
        if (!isProduction()) {
          if (isFragment(child)) {
            // eslint-disable-next-line no-console
            console.error(
              [
                "sixui: The Breadcrumbs component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join('\n'),
            );
          }
        }

        return isValidElement(child);
      })
      .map((child, index) => (
        <li {...styleProps(['item'])} key={`child-${index}`}>
          {child}
        </li>
      ));

    return (
      <ol {...styleProps(['host', sx], [theme.vars])} ref={ref} {...other}>
        {insertSeparators(
          expanded || (maxItems !== undefined && allItems.length <= maxItems)
            ? allItems
            : renderItemsBeforeAndAfter(allItems),
        )}
      </ol>
    );
  },
);
