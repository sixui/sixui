import type { ITabPanelThemeFactory } from './TabPanel.css';
import type { ITabPanelFactory } from './TabPanel.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
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
      disabled,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ITabPanelThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: tabPanelTheme,
      modifiers: {
        disabled,
      },
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        {children}
      </Box>
    );
  },
);

TabPanel.theme = tabPanelTheme;
TabPanel.displayName = `@sixui/${COMPONENT_NAME}`;
