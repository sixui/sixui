import { forwardRef } from 'react';
import stylex from '@stylexjs/stylex';

import { Divider, type IDividerProps } from '@/components/atoms/Divider';

// TODO: migrate in theme
const styles = stylex.create({
  host: {
    marginTop: 8,
    marginBottom: 8,
  },
});

export const MenuDivider = forwardRef<HTMLDivElement, IDividerProps>(
  function MenuDivider(props, forwardedRef) {
    const { sx, ...other } = props;

    return <Divider sx={[styles.host, sx]} ref={forwardedRef} {...other} />;
  },
);
