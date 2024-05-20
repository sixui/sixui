import stylex from '@stylexjs/stylex';
import { forwardRef, useContext } from 'react';

import type { IContainerProps } from '@/helpers/types';
import { TabContext } from '@/components/atoms/Tabs';

export type ITabPanelProps = Omit<IContainerProps, 'styles'> & {
  anchor: string;
  children?: React.ReactNode;
};

export const TabPanel = forwardRef<HTMLDivElement, ITabPanelProps>(
  function TabPanel(props, ref) {
    const { sx, anchor, children } = props;

    const context = useContext(TabContext);

    if (context?.anchor !== anchor) {
      return null;
    }

    const id = context && anchor ? `${context.id}-${anchor}` : undefined;

    return (
      <div {...stylex.props(sx)} ref={ref} role='tabpanel' aria-labelledby={id}>
        {children}
      </div>
    );
  },
);
