import { forwardRef, useMemo } from 'react';

import type { IListProps } from './List.types';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { commonStyles } from '~/helpers/commonStyles';
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
      cols = 1,
      ...other
    } = props;

    const componentTheme = useComponentTheme('List');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(listStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    const isGrid = cols > 1;

    return (
      <ListContext.Provider value={{ size, noFocusRing }}>
        <div
          {...other}
          {...sxf(listTheme, componentTheme.overridenStyles, 'host', sx)}
          ref={forwardedRef}
        >
          <div {...sxf('inner')}>
            <div {...sxf('header')}>{header}</div>
            <div
              {...sxf(
                'content',
                isGrid && 'content$grid',
                isGrid &&
                  commonStyles.gridTemplateColumns(`repeat(${cols}, 1fr)`),
                !children && 'content$empty',
              )}
            >
              {children}
            </div>
            <div {...sxf('footer')}>{footer}</div>
          </div>
        </div>
      </ListContext.Provider>
    );
  },
);
