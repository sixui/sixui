import type { IElevationFactory } from './Elevation.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/hooks/useProps';
import { useStyles } from '~/utils/styles/useStyles';
import { Box } from '../Box';
import { elevationStyles, type IElevationStylesFactory } from './Elevation.css';

const COMPONENT_NAME = 'Elevation';

export const Elevation = componentFactory<IElevationFactory>(
  (props, forwardedRef) => {
    const { classNames, className, style, level, disabled, ...other } =
      useProps({
        componentName: COMPONENT_NAME,
        props,
      });

    const { getStyles } = useStyles<IElevationStylesFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles: elevationStyles,
      style,
    });

    return (
      <Box
        {...other}
        {...getStyles('root')}
        aria-hidden
        modifiers={{ level, disabled }}
        ref={forwardedRef}
      />
    );
  },
);

Elevation.styles = elevationStyles;
Elevation.displayName = `@sixui/${COMPONENT_NAME}`;
