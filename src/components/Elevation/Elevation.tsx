import type { IElevationThemeFactory } from './Elevation.css';
import type { IElevationFactory } from './Elevation.types';
import { Box } from '~/components/Box';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { elevationTheme } from './Elevation.css';

const COMPONENT_NAME = 'Elevation';

export const Elevation = componentFactory<IElevationFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      level,
      disabled,
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const { getStyles } = useComponentTheme<IElevationThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: elevationTheme,
      modifiers: { level, disabled },
    });

    return (
      <Box {...getStyles('root')} aria-hidden ref={forwardedRef} {...other} />
    );
  },
);

Elevation.theme = elevationTheme;
Elevation.displayName = `@sixui/${COMPONENT_NAME}`;
