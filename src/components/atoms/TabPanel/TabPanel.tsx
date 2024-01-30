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

  return (
    <div
      role='tabpanel'
      // TODO: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
      aria-labelledby=''
    >
      {children}
    </div>
  );
};
