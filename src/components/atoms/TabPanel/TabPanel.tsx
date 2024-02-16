import * as React from 'react';

import { useTabContext } from '../Tabs/useTabContext';

export interface ITabPanelProps {
  anchor: string;
  children?: React.ReactNode;
}

export const TabPanel: React.FC<ITabPanelProps> = ({ anchor, children }) => {
  const tabContext = useTabContext();

  if (tabContext?.anchor !== anchor) {
    return null;
  }

  const id = tabContext && anchor ? `${tabContext.id}-${anchor}` : undefined;

  return (
    <div role='tabpanel' aria-labelledby={id}>
      {children}
    </div>
  );
};
