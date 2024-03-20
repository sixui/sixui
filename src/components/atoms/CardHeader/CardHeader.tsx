import { forwardRef } from 'react';

import { useComponentTheme } from '@/hooks/useComponentTheme';
import { type IItemProps, Item } from '../Item';

export type ICardHeaderProps = IItemProps;

export const CardHeader = forwardRef<HTMLDivElement, ICardHeaderProps>(
  function CardHeader(props, ref) {
    const { sx, ...other } = props;

    const { theme } = useComponentTheme('CardHeader');

    return <Item {...other} sx={[sx, theme.vars]} ref={ref} />;
  },
);
