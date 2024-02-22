import * as React from 'react';

import { useComponentTheme } from '@/hooks/useComponentTheme';
import { type IItemProps, Item } from '../Item';

export interface ICardHeaderProps extends IItemProps {}

export const CardHeader: React.FC<ICardHeaderProps> = ({ ...props }) => {
  const theme = useComponentTheme('CardHeader');

  return <Item {...props} theme={theme.vars} />;
};
