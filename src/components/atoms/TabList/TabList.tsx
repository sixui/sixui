import { forwardRef, useMemo } from 'react';

import type { ITabListStyleKey } from './TabList.styledefs';
import type { ITabListProps } from './TabListProps';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Divider } from '../Divider';

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
