import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type { ITabListStyleKey } from './TabList.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Divider } from '../Divider';

export type ITabListProps = Pick<React.AriaAttributes, 'aria-label'> &
  Omit<IContainerProps<ITabListStyleKey>, 'theme'> & {
    children?: React.ReactNode;
  };

export const TabList = forwardRef<HTMLInputElement, ITabListProps>(
  function TabList(props, ref) {
    const { styles, sx, children, ...other } = props;

    const { theme } = useComponentTheme('TabList');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const styleProps = useMemo(
      () => stylePropsFactory<ITabListStyleKey>(stylesCombinator),
      [stylesCombinator],
    );

    return (
      <div
        {...styleProps(['host', sx])}
        role='tablist'
        aria-orientation='horizontal'
        ref={ref}
        {...other}
      >
        <div {...styleProps(['tabList'])}>{children}</div>
        <Divider />
      </div>
    );
  },
);
