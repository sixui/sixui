import React from 'react';

import { useTabsContext } from '../Tabs/useTabsContext';

export interface ITabPanelProps {
  anchor: string;
  children?: React.ReactNode;
}

export const TabPanel: React.FC<ITabPanelProps> = ({ anchor, children }) => {
  const tabsContext = useTabsContext();

  if (tabsContext?.anchor !== anchor) {
    return null;
  }

  const id = tabsContext && anchor ? `${tabsContext.id}-${anchor}` : undefined;

  return (
    <div role='tabpanel' aria-labelledby={id}>
      {children}
    </div>
  );
};
