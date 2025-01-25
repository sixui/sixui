import type { IScrimThemeFactory } from './Scrim.css';
import type { IScrimFactory } from './Scrim.types';
import { Box } from '~/components/Box';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { scrimTheme } from './Scrim.css';

const COMPONENT_NAME = 'Scrim';

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
Scrim.displayName = `@sixui/${COMPONENT_NAME}`;
