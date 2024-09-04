import type { IPaperBaseFactory } from './PaperBase.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useStyles } from '~/utils/styles/useStyles';
import { Elevation } from '../Elevation';
import { Box } from '../Box';
import { paperBaseStyles, type IPaperBaseStylesFactory } from './PaperBase.css';

const COMPONENT_NAME = 'PaperBase';

export const PaperBase = polymorphicComponentFactory<IPaperBaseFactory>(
  (props, forwardedRef) => {
    const { classNames, className, style, variant, children, ...other } =
      useProps({
        componentName: COMPONENT_NAME,
        props,
      });

    const { getStyles } = useStyles<IPaperBaseStylesFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles: paperBaseStyles,
      style,
      variant,
    });

    return (
      <Box {...other} {...getStyles('root')} ref={forwardedRef}>
        <Elevation {...getStyles('elevation')} />
        <div {...getStyles('background')} aria-hidden />
        {children}
        <div {...getStyles('outline')} aria-hidden />
      </Box>
    );
  },
);

PaperBase.styles = paperBaseStyles;
PaperBase.displayName = `@sixui/${COMPONENT_NAME}`;
