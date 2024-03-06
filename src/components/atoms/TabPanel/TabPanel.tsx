import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type { ITabPanelStyleKey } from './TabPanel.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useTabContext } from '../Tabs/useTabContext';

export type ITabPanelProps = IContainerProps<ITabPanelStyleKey> & {
  anchor: string;
  children?: React.ReactNode;
};

export const TabPanel = forwardRef<HTMLDivElement, ITabPanelProps>(
  function TabPanel(props, ref) {
    const { styles, sx, anchor, children } = props;

    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(styles),
      [styles],
    );
    const styleProps = useMemo(
      () => stylePropsFactory<ITabPanelStyleKey>(stylesCombinator),
      [stylesCombinator],
    );

    const tabContext = useTabContext();

    if (tabContext?.anchor !== anchor) {
      return null;
    }

    const id = tabContext && anchor ? `${tabContext.id}-${anchor}` : undefined;

    return (
      <div
        {...styleProps(['host', sx])}
        ref={ref}
        role='tabpanel'
        aria-labelledby={id}
      >
        {children}
      </div>
    );
  },
);
