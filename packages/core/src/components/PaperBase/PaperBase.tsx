import type { IPaperBaseThemeFactory } from './PaperBase.css';
import type { IPaperBaseFactory } from './PaperBase.types';
import { Box } from '~/components/Box';
import { Elevation } from '~/components/Elevation';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { COMPONENT_NAME } from './PaperBase.constants';
import { paperBaseTheme } from './PaperBase.css';

export const PaperBase = polymorphicComponentFactory<IPaperBaseFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      expanded,
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const { getStyles } = useComponentTheme<IPaperBaseThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: paperBaseTheme,
      modifiers: {
        expanded,
      },
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        <Elevation {...getStyles('elevation')} />
        <div {...getStyles('background')} aria-hidden />
        {children}
        <div {...getStyles('outline')} aria-hidden />
      </Box>
    );
  },
);

PaperBase.displayName = `@sixui/core/${COMPONENT_NAME}`;
PaperBase.theme = paperBaseTheme;
