import { forwardRef } from 'react';

import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Divider, type IDividerProps } from '@/components/atoms/Divider';

export const MenuListDivider = forwardRef<HTMLDivElement, IDividerProps>(
  function MenuListDivider(props, forwardedRef) {
    const { sx, ...other } = props;

    const { theme } = useComponentTheme('MenuList');

    return (
      <Divider sx={[theme.styles?.divider, sx]} ref={forwardedRef} {...other} />
    );
  },
);
