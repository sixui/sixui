import { forwardRef } from 'react';

import type { IListProps } from './List.types';
import { commonStyles } from '~/helpers/commonStyles';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '../Base';
import { ListContext } from './List.context';
import { listStyles } from './List.styles';
import { listTheme } from './List.stylex';
import { Stack } from '../Stack';

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
      divider,
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
          <Stack sx={combineStyles('inner')}>
            <div {...getStyles('header')}>{header}</div>
            <Stack
              divider={divider}
              sx={combineStyles(
                'content',
                isGrid && 'content$grid',
                isGrid &&
                  commonStyles.gridTemplateColumns(`repeat(${cols}, 1fr)`),
                !children && 'content$empty',
              )}
            >
              {children}
            </Stack>
            <div {...getStyles('footer')}>{footer}</div>
          </Stack>
        </Base>
      </ListContext.Provider>
    );
  },
);
