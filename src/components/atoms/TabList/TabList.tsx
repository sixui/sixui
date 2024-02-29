import { useMemo } from 'react';

import type { IContainerProps } from '@/components/utils/Container';
import type { ITabListStyleKey } from './TabList.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Divider } from '../Divider';

export type ITabListProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-label'
> &
  Omit<IContainerProps<ITabListStyleKey>, 'theme'> & {
    children?: React.ReactNode;
    defaultValue?: string;
  };

export const TabList: React.FC<ITabListProps> = ({ children, ...props }) => {
  const theme = useComponentTheme('TabList');

  const styleProps = useMemo(
    () =>
      stylePropsFactory<ITabListStyleKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
        props.visualState,
      ),
    [theme.styles, props.styles, props.visualState],
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
