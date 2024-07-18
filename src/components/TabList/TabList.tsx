import { forwardRef, useMemo } from 'react';

import type { ITabListProps } from './TabList.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Divider } from '@/components/Divider';
import { tabListStyles } from './TabList.styles';

export const TabList = forwardRef<HTMLInputElement, ITabListProps>(
  function TabList(props, forwardedRef) {
    const { styles, sx, children, fullWidth, ...other } = props;

    const componentTheme = useComponentTheme('TabList');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(tabListStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    return (
      <div
        {...sxf(componentTheme.overridenStyles, 'host', sx)}
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
