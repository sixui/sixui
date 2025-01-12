import type { ITabsThemeFactory } from './Tabs.css';
import type { ITabsFactory } from './Tabs.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { basicTemplateTheme } from './Tabs.css';

const COMPONENT_NAME = 'Tabs';

export const Tabs = componentFactory<ITabsFactory>((props, forwardedRef) => {
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

  const { getStyles } = useComponentTheme<ITabsThemeFactory>({
    componentName: COMPONENT_NAME,
    classNames,
    className,
    styles,
    style,
    variant,
    theme: basicTemplateTheme,
    modifiers: {
      disabled,
    },
  });

  return (
    <Box {...getStyles('root')} ref={forwardedRef} {...other}>
      {children}
    </Box>
  );
});

Tabs.theme = basicTemplateTheme;
Tabs.displayName = `@sixui/${COMPONENT_NAME}`;
