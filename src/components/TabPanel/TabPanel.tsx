import { forwardRef, useContext, useMemo } from 'react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import { TabContext } from '../Tabs';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import {
  TAB_PANEL_DEFAULT_TAG,
  type ITabPanelProps,
  type ITabPanelOwnProps,
} from './TabPanel.types';

type ITabPanel = <
  TRoot extends React.ElementType = typeof TAB_PANEL_DEFAULT_TAG,
>(
  props: ITabPanelProps<TRoot>,
) => React.ReactNode;

export const TabPanel: ITabPanel = forwardRef(function TabPanel<
  TRoot extends React.ElementType = typeof TAB_PANEL_DEFAULT_TAG,
>(props: ITabPanelProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const { styles, sx, component, anchor, children } =
    props as IWithAsProp<ITabPanelOwnProps>;

  const componentTheme = useComponentTheme('TabPanel');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

  const tabContext = useContext(TabContext);

  if (tabContext?.disabled || tabContext?.anchor !== anchor) {
    return null;
  }

  const id = tabContext && anchor ? `${tabContext.id}-${anchor}` : undefined;
  const Component = component ?? TAB_PANEL_DEFAULT_TAG;

  return (
    <Component
      {...sxf(componentTheme.overridenStyles, 'host', sx)}
      sx={[componentTheme.overridenStyles, stylesCombinator('host'), sx]}
      ref={forwardedRef}
      role='tabpanel'
      aria-labelledby={id}
    >
      {children}
    </Component>
  );
});
