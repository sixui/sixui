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
    });

    if (disabled) {
      return null;
    }

    return (
      <Box
        {...getStyles('root', {
          modifiers: {
            fixed,
            center,
            blurred,
          },
        })}
        ref={forwardedRef}
        {...other}
      >
        {children}
      </Box>
    );
  },
);

Scrim.displayName = `@sixui/core/${COMPONENT_NAME}`;
Scrim.theme = scrimTheme;
