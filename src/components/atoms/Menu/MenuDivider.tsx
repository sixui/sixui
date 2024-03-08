import { forwardRef } from 'react';

import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Divider, type IDividerProps } from '@/components/atoms/Divider';

export const MenuDivider = forwardRef<HTMLDivElement, IDividerProps>(
  function MenuDivider(props, ref) {
    const { sx, ...other } = props;

    const { theme } = useComponentTheme('Menu');

    return <Divider sx={[theme.styles?.divider, sx]} ref={ref} {...other} />;
  },
);
