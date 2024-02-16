import * as React from 'react';

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
  const theme = useComponentTheme('TabList');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<ITabListStyleKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
      ),
    [theme.styles, props.styles],
  );

  return (
    <div
      {...styleProps(['host', props.sx])}
      role='tablist'
      aria-orientation='horizontal'
    >
      <div {...styleProps(['tabList'])}>{children}</div>
      <Divider />
    </div>
  );
};
