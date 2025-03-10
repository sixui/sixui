import type { ITabsPanelFactory } from './TabsPanel.types';
import { Box } from '~/components/Box';
import { useTabsContext } from '~/components/Tabs/Tabs.context';
import { useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './TabsPanel.constants';

/**
 * @see https://m3.material.io/components/tabs/overview
 */
export const TabsPanel = componentFactory<ITabsPanelFactory>(
  (props, forwardedRef) => {
    const { children, anchor, ...other } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const tabsContext = useTabsContext();
    const active = tabsContext?.anchor === anchor;
    const id =
      tabsContext && anchor ? `${tabsContext.id}-${anchor}` : undefined;

    return (
      active && (
        <Box ref={forwardedRef} role="tabpanel" aria-labelledby={id} {...other}>
          {children}
        </Box>
      )
    );
  },
);

TabsPanel.displayName = `@sixui/core/${COMPONENT_NAME}`;
