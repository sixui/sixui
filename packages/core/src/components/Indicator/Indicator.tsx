import type { IIndicatorThemeFactory } from './Indicator.css';
import type { IIndicatorFactory } from './Indicator.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils';
import { COMPONENT_NAME } from './Indicator.constants';
import { indicatorTheme } from './Indicator.css';

export const Indicator = polymorphicComponentFactory<IIndicatorFactory>(
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
    });

    return (
      <Box
        {...getStyles('root', {
          modifiers: {
            processing,
          },
        })}
        ref={forwardedRef}
        {...other}
      >
        {children}
      </Box>
    );
  },
);

Indicator.displayName = `@sixui/core/${COMPONENT_NAME}`;
Indicator.theme = indicatorTheme;
