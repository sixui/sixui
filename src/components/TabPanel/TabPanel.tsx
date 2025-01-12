import type { ITabPanelThemeFactory } from './TabPanel.css';
import type { ITabPanelFactory } from './TabPanel.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { useTabsContext } from '../Tabs';
import { tabPanelTheme } from './TabPanel.css';

const COMPONENT_NAME = 'TabPanel';

export const TabPanel = componentFactory<ITabPanelFactory>(
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
    const visible = tabsContext?.disabled || tabsContext?.anchor !== anchor;

    if (!visible) {
      return null;
    }

    const id =
      tabsContext && anchor ? `${tabsContext.id}-${anchor}` : undefined;

    const { getStyles } = useComponentTheme<ITabPanelThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: tabPanelTheme,
    });

    return (
      <Box
        {...getStyles('root')}
        ref={forwardedRef}
        role="tabpanel"
        aria-labelledby={id}
        {...other}
      >
        {children}
      </Box>
    );
  },
);

TabPanel.theme = tabPanelTheme;
TabPanel.displayName = `@sixui/${COMPONENT_NAME}`;
