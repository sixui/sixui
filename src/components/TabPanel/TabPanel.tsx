import { forwardRef, useContext } from 'react';

import type { ITabPanelProps } from './TabPanel.types';
import { Base } from '../Base';
import { TabContext } from '../Tabs';

export const TabPanel = forwardRef<HTMLDivElement, ITabPanelProps>(
  function TabPanel(props, forwardedRef) {
    const { sx, anchor, children, ...other } = props;

    const tabContext = useContext(TabContext);

    if (tabContext?.disabled || tabContext?.anchor !== anchor) {
      return null;
    }

    const id = tabContext && anchor ? `${tabContext.id}-${anchor}` : undefined;

    return (
      <Base
        role='tabpanel'
        aria-labelledby={id}
        {...other}
        sx={sx}
        ref={forwardedRef}
      >
        {children}
      </Base>
    );
  },
);
