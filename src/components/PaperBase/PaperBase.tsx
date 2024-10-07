import type { IPaperBaseThemeFactory } from './PaperBase.css';
import type { IPaperBaseFactory } from './PaperBase.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { Elevation } from '../Elevation';
import { paperBaseTheme } from './PaperBase.css';

const COMPONENT_NAME = 'PaperBase';

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
      disabled,
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
      theme: paperBaseTheme,
      variant,
      modifiers: {
        expanded,
        disabled,
      },
    });

    return (
      <Box
        {...getStyles('root')}
        ref={forwardedRef}
        disabled={disabled}
        {...other}
      >
        <Elevation {...getStyles('elevation')} />
        <div {...getStyles('background')} aria-hidden />
        {children}
        <div {...getStyles('outline')} aria-hidden />
      </Box>
    );
  },
);

PaperBase.theme = paperBaseTheme;
PaperBase.displayName = `@sixui/${COMPONENT_NAME}`;
