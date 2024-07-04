import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type { ITabListStyleKey } from './TabList.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Divider } from '../Divider';

export type ITabListProps = Pick<React.AriaAttributes, 'aria-label'> &
  IContainerProps<ITabListStyleKey> & {
    children?: React.ReactNode;
    fullWidth?: boolean;
  };

export const TabList = forwardRef<HTMLInputElement, ITabListProps>(
  function TabList(props, forwardedRef) {
    const { styles, sx, children, fullWidth, ...other } = props;

    const { theme } = useComponentTheme('TabList');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory<ITabListStyleKey>(stylesCombinator),
      [stylesCombinator],
    );

    return (
      <div
        {...sxf('host', sx)}
        role='tablist'
        aria-orientation='horizontal'
        ref={forwardedRef}
        {...other}
      >
        <div {...sxf('tabList', fullWidth && 'tabList$fullWidth')}>
          {children}
        </div>
        <Divider />
      </div>
    );
  },
);
