import { forwardRef, useMemo } from 'react';

import type { IListProps } from './List.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { ListContext } from './ListContext';
import { listStyles } from './List.styles';
import { listTheme } from './List.stylex';

export const List = forwardRef<HTMLDivElement, IListProps>(
  function List(props, forwardedRef) {
    const {
      styles,
      sx,
      size,
      noFocusRing,
      children,
      header,
      footer,
      ...other
    } = props;

    const { overridenStyles } = useComponentTheme('List');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(listStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    return (
      <ListContext.Provider value={{ size, noFocusRing }}>
        <div
          {...sxf(listTheme, overridenStyles, 'host', sx)}
          ref={forwardedRef}
          {...other}
        >
          <div {...sxf('inner')}>
            <div {...sxf('header')}>{header}</div>
            <div {...sxf('content', !children && 'content$empty')}>
              {children}
            </div>
            <div {...sxf('footer')}>{footer}</div>
          </div>
        </div>
      </ListContext.Provider>
    );
  },
);
