import React from 'react';

import type { IContainer } from '@/helpers/Container';
import type { ITabListStyleKey } from './TabList.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Divider } from '../Divider';

export interface ITabListProps
  extends Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'>,
    Omit<IContainer<ITabListStyleKey>, 'theme'> {
  children?: React.ReactNode;
  defaultValue?: string;
}

export const TabList: React.FC<ITabListProps> = ({ children, ...props }) => {
  const { styles } = useComponentTheme('TabList');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<ITabListStyleKey>(
        stylesCombinatorFactory(styles, props.styles),
      ),
    [styles, props.styles],
  );

  return (
    <div {...styleProps(['host'])} role='tablist'>
      <div {...styleProps(['tabList'])}>{children}</div>
      <Divider />
    </div>
  );
};
