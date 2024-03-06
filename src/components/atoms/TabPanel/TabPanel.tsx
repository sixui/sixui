import stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { IContainerProps } from '@/helpers/types';
import { useTabContext } from '../Tabs/useTabContext';

export type ITabPanelProps = Omit<IContainerProps, 'styles'> & {
  anchor: string;
  children?: React.ReactNode;
};

export const TabPanel = forwardRef<HTMLDivElement, ITabPanelProps>(
  function TabPanel(props, ref) {
    const { sx, anchor, children } = props;

    const tabContext = useTabContext();

    if (tabContext?.anchor !== anchor) {
      return null;
    }

    const id = tabContext && anchor ? `${tabContext.id}-${anchor}` : undefined;

    return (
      <div
        {...stylex.props(...asArray(sx))}
        ref={ref}
        role='tabpanel'
        aria-labelledby={id}
      >
        {children}
      </div>
    );
  },
);
