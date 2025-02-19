import type { IColorSchemeRoleThemeFactory } from './ColorSchemeRole.css';
import type { IColorSchemeRoleFactory } from './ColorSchemeRole.types';
import { Paper } from '~/components/Paper';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './ColorSchemeRole.constants';
import { colorSchemeRoleTheme } from './ColorSchemeRole.css';

export const ColorSchemeRole = componentFactory<IColorSchemeRoleFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      label,
      size,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IColorSchemeRoleThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: colorSchemeRoleTheme,
      modifiers: {
        size,
      },
    });

    return (
      <Paper {...getStyles('root')} ref={forwardedRef} {...other}>
        {label}
      </Paper>
    );
  },
);

ColorSchemeRole.theme = colorSchemeRoleTheme;
ColorSchemeRole.displayName = `@sixui/core/${COMPONENT_NAME}`;
