import { forwardRef } from 'react';
import { asArray } from '@olivierpascal/helpers';

import { useComponentTheme } from '@/hooks/useComponentTheme';
import { type IItemProps, Item } from '../Item';

export type ICardHeaderProps = IItemProps;

export const CardHeader = forwardRef<HTMLDivElement, ICardHeaderProps>(
  function CardHeader(props, ref) {
    const { sx, ...other } = props;

    const { theme } = useComponentTheme('CardHeader');

    return <Item {...other} sx={[...asArray(sx), theme.vars]} ref={ref} />;
  },
);
