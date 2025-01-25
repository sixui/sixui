import type { ITabsPanelThemeFactory } from './TabsPanel.css';
import type { ITabsPanelFactory } from './TabsPanel.types';
import { Box } from '~/components/Box';
import { useTabsContext } from '~/components/Tabs/Tabs.context';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { tabsPanelTheme } from './TabsPanel.css';

const COMPONENT_NAME = 'TabsPanel';

export const TabsPanel = componentFactory<ITabsPanelFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      anchor,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const tabsContext = useTabsContext();
    const active = tabsContext?.anchor === anchor;
    const id =
      tabsContext && anchor ? `${tabsContext.id}-${anchor}` : undefined;

    const { getStyles } = useComponentTheme<ITabsPanelThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: tabsPanelTheme,
    });

    return (
      active && (
        <Box
          {...getStyles('root')}
          ref={forwardedRef}
          role="tabpanel"
          aria-labelledby={id}
          {...other}
        >
          {children}
        </Box>
      )
    );
  },
);

TabsPanel.theme = tabsPanelTheme;
TabsPanel.displayName = `@sixui/${COMPONENT_NAME}`;
