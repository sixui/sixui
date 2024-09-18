import type { IScrimThemeFactory } from './Scrim.css';
import type { IScrimFactory } from './Scrim.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { scrimTheme } from './Scrim.css';
import { Box } from '../Box';

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
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IScrimThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: scrimTheme,
      variant,
      modifiers: {
        fixed,
        center,
      },
    });

    return (
      <Box {...other} {...getStyles('root')} ref={forwardedRef}>
        {children}
      </Box>
    );
  },
);

Scrim.theme = scrimTheme;
Scrim.displayName = `@sixui/${COMPONENT_NAME}`;
