import type { IIndicatorThemeFactory } from './Indicator.css';
import type { IIndicatorFactory } from './Indicator.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { indicatorTheme } from './Indicator.css';

const COMPONENT_NAME = 'Indicator';

export const Indicator = componentFactory<IIndicatorFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      processing,
      children,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IIndicatorThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: indicatorTheme,
      modifiers: {
        processing,
      },
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        {children}
      </Box>
    );
  },
);

Indicator.theme = indicatorTheme;
Indicator.displayName = `@sixui/${COMPONENT_NAME}`;
