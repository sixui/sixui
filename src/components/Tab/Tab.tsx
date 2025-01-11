import type { ITabThemeFactory } from './Tab.css';
import type { ITabFactory } from './Tab.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { tabTheme, tabThemeVariants } from './Tab.css';

const COMPONENT_NAME = 'Tab';

export const Tab = componentFactory<ITabFactory>((props, forwardedRef) => {
  const {
    classNames,
    className,
    styles,
    style,
    variant = 'primary',
    active,
    icon,
    activeIcon,
    onClick,
    label,
    href,
    anchor,
    disabled,
    badgeProps,
    ...other
  } = useProps({ componentName: COMPONENT_NAME, props });

  const { getStyles } = useComponentTheme<ITabThemeFactory>({
    componentName: COMPONENT_NAME,
    classNames,
    className,
    styles,
    style,
    variant,
    theme: tabTheme,
    themeVariants: tabThemeVariants,
    modifiers: {
      disabled,
    },
  });

  return (
    <Box {...getStyles('root')} ref={forwardedRef} {...other}>
      XX
    </Box>
  );
});

Tab.theme = tabTheme;
Tab.displayName = `@sixui/${COMPONENT_NAME}`;
