import { forwardRef, useContext, useMemo } from 'react';

import type { ITabPanelProps } from './TabPanel.types';
import { TabContext } from '@/components/atoms/Tabs';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';

export const TabPanel = forwardRef<HTMLDivElement, ITabPanelProps>(
  function TabPanel(props, forwardedRef) {
    const { styles, sx, anchor, children } = props;

    const { overridenStyles } = useComponentTheme('TabPanel');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    const context = useContext(TabContext);

    if (context?.anchor !== anchor) {
      return null;
    }

    const id = context && anchor ? `${context.id}-${anchor}` : undefined;

    return (
      <div
        {...sxf(overridenStyles, 'host', sx)}
        ref={forwardedRef}
        role='tabpanel'
        aria-labelledby={id}
      >
        {children}
      </div>
    );
  },
);
