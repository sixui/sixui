import type { IElevationThemeFactory } from './Elevation.css';
import type { IElevationFactory } from './Elevation.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './Elevation.constants';
import { elevationTheme } from './Elevation.css';

/**
 * @see https://m3.material.io/styles/elevation
 */
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

Elevation.displayName = `@sixui/core/${COMPONENT_NAME}`;
Elevation.theme = elevationTheme;
