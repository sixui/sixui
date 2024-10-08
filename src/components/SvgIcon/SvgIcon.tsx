import type { ISvgIconFactory } from './SvgIcon.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { ISvgIconThemeFactory, svgIconTheme } from './SvgIcon.css';

const COMPONENT_NAME = 'SvgIcon';

export const SvgIcon = componentFactory<ISvgIconFactory>(
  (props, forwardedRef) => {
    const { classNames, className, styles, style, variant, icon, ...other } =
      useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ISvgIconThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: svgIconTheme,
      variant,
    });

    return (
      <Box
        aria-hidden
        dangerouslySetInnerHTML={{ __html: icon.data }}
        {...getStyles('root')}
        ref={forwardedRef}
        {...other}
      />
    );
  },
);

SvgIcon.theme = svgIconTheme;
SvgIcon.displayName = `@sixui/${COMPONENT_NAME}`;
