import type { ISvgIconThemeFactory } from './SvgIcon.css';
import type { ISvgIconFactory } from './SvgIcon.types';
import { Box } from '~/components/Box';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { COMPONENT_NAME } from './SvgIcon.constants';
import { svgIconTheme } from './SvgIcon.css';

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
      variant,
      theme: svgIconTheme,
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
