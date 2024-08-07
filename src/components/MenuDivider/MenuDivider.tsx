import { forwardRef } from 'react';

import { Divider, type IDividerProps } from '../Divider';
import { useStyles } from '~/hooks/useStyles';
import { menuDividerStyles } from './MenuDivider.styles';

export const MenuDivider = forwardRef<HTMLDivElement, IDividerProps>(
  function MenuDivider(props, forwardedRef) {
    const { styles, sx, ...other } = props;

    const { combineStyles, globalStyles } = useStyles({
      name: 'MenuDivider',
      styles: [menuDividerStyles, styles],
    });

    return (
      <Divider
        {...other}
        sx={[globalStyles, combineStyles('host'), sx]}
        ref={forwardedRef}
      />
    );
  },
);
