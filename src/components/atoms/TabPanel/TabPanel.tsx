import stylex from '@stylexjs/stylex';
import { forwardRef, useContext } from 'react';

import type { ITabPanelProps } from './TabPanelProps';
import { TabContext } from '@/components/atoms/Tabs';

export const TabPanel = forwardRef<HTMLDivElement, ITabPanelProps>(
  function TabPanel(props, forwardedRef) {
    const { sx, anchor, children } = props;

    const context = useContext(TabContext);

    if (context?.anchor !== anchor) {
      return null;
    }

    const id = context && anchor ? `${context.id}-${anchor}` : undefined;

    return (
      <div
        {...stylex.props(sx)}
        ref={forwardedRef}
        role='tabpanel'
        aria-labelledby={id}
      >
        {children}
      </div>
    );
  },
);
