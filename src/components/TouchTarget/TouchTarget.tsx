import type { ITouchTargetThemeFactory } from './TouchTarget.css';
import type { ITouchTargetFactory } from './TouchTarget.types';
import { Box } from '~/components/Box';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { touchTargetTheme } from './TouchTarget.css';

const COMPONENT_NAME = 'TouchTarget';

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
      theme: touchTargetTheme,
      variant,
    });

    return <Box {...other} {...getStyles('root')} ref={forwardedRef} />;
  },
);

TouchTarget.theme = touchTargetTheme;
TouchTarget.displayName = `@sixui/${COMPONENT_NAME}`;
