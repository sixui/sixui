import type { IPaperBaseFactory } from './PaperBase.types';
import { polymorphicComponentFactory } from '~/utils/polymorphicComponentFactory';
import { useProps } from '~/hooks/useProps';
import { useStyles } from '~/hooks/useStyles2';
import { Elevation } from '../Elevation';
import { Box } from '../Box';
import { paperBaseStyles, type IPaperBaseStylesFactory } from './PaperBase.css';

const COMPONENT_NAME = 'PaperBase';

export const PaperBase = polymorphicComponentFactory<IPaperBaseFactory>(
  (props, forwardedRef) => {
    const { classNames, className, style, children, ...other } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const { getStyles } = useStyles<IPaperBaseStylesFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles: paperBaseStyles,
      style,
    });

    return (
      <Box {...other} {...other} {...getStyles('root')} ref={forwardedRef}>
        <Elevation {...getStyles('elevation')} />
        <div {...getStyles('outline')} />
        <div {...getStyles('background')} />
        {children}
      </Box>
    );
  },
);

PaperBase.styles = paperBaseStyles;
PaperBase.displayName = `@sixui/${COMPONENT_NAME}`;
