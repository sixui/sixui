import { forwardRef, useContext } from 'react';

import type { ITabPanelProps } from './TabPanel.types';
import { Base } from '../Base';
import { TabsContext } from '../Tabs';

export const TabPanel = forwardRef<HTMLDivElement, ITabPanelProps>(
  function TabPanel(props, forwardedRef) {
    const { sx, anchor, children, ...other } = props;

    const tabsContext = useContext(TabsContext);

    if (tabsContext?.disabled || tabsContext?.anchor !== anchor) {
      return null;
    }

    const id =
      tabsContext && anchor ? `${tabsContext.id}-${anchor}` : undefined;

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
