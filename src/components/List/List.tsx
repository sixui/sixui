import { forwardRef } from 'react';

import type { IListProps } from './List.types';
import { commonStyles } from '~/helpers/commonStyles';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '../Base';
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

    const { combineStyles, getStyles, globalStyles } = useStyles({
      name: 'List',
      styles: [listStyles, styles],
    });

    const isGrid = cols > 1;

    return (
      <ListContext.Provider value={{ size, noFocusRing }}>
        <Base
          {...other}
          sx={[listTheme, globalStyles, combineStyles('host'), sx]}
          ref={forwardedRef}
        >
          <div {...getStyles('inner')}>
            <div {...getStyles('header')}>{header}</div>
            <div
              {...getStyles(
                'content',
                isGrid && 'content$grid',
                isGrid &&
                  commonStyles.gridTemplateColumns(`repeat(${cols}, 1fr)`),
                !children && 'content$empty',
              )}
            >
              {children}
            </div>
            <div {...getStyles('footer')}>{footer}</div>
          </div>
        </Base>
      </ListContext.Provider>
    );
  },
);
