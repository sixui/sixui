import type { IScrimThemeFactory } from './Scrim.css';
import type { IScrimFactory } from './Scrim.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { COMPONENT_NAME } from './Scrim.constants';
import { scrimTheme } from './Scrim.css';

export const Scrim = polymorphicComponentFactory<IScrimFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'darken',
      children,
      fixed,
      center,
      disabled,
      blurred,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IScrimThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: scrimTheme,
      modifiers: {
        fixed,
        center,
        blurred,
      },
    });

    if (disabled) {
      return null;
    }

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        {children}
      </Box>
    );
  },
);

Scrim.theme = scrimTheme;
Scrim.displayName = `@sixui/core/${COMPONENT_NAME}`;
