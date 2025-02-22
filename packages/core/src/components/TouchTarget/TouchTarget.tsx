import type { ITouchTargetThemeFactory } from './TouchTarget.css';
import type { ITouchTargetFactory } from './TouchTarget.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './TouchTarget.constants';
import { touchTargetTheme } from './TouchTarget.css';

/**
 * @see https://m3.material.io/foundations/designing/structure
 */
export const TouchTarget = componentFactory<ITouchTargetFactory>(
  (props, forwardedRef) => {
    const { classNames, className, styles, style, variant, ...other } =
      useProps({
        componentName: COMPONENT_NAME,
        props,
      });

    const { getStyles } = useComponentTheme<ITouchTargetThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: touchTargetTheme,
    });

    return <Box {...getStyles('root')} ref={forwardedRef} {...other} />;
  },
);

TouchTarget.theme = touchTargetTheme;
TouchTarget.displayName = `@sixui/core/${COMPONENT_NAME}`;
