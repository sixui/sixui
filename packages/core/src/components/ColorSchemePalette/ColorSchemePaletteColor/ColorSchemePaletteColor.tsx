import type { IColorSchemePaletteColorThemeFactory } from './ColorSchemePaletteColor.css';
import type { IColorSchemePaletteColorFactory } from './ColorSchemePaletteColor.types';
import { Paper } from '~/components/Paper';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './ColorSchemePaletteColor.constants';
import { colorSchemeRoleTheme } from './ColorSchemePaletteColor.css';

export const ColorSchemePaletteColor =
  componentFactory<IColorSchemePaletteColorFactory>((props, forwardedRef) => {
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

    const { getStyles } =
      useComponentTheme<IColorSchemePaletteColorThemeFactory>({
        componentName: COMPONENT_NAME,
        classNames,
        className,
        styles,
        style,
        variant,
        theme: colorSchemeRoleTheme,
      });

    return (
      <Paper
        {...getStyles('root', {
          modifiers: {
            size,
          },
        })}
        ref={forwardedRef}
        {...other}
      >
        {label}
      </Paper>
    );
  });

ColorSchemePaletteColor.displayName = `@sixui/core/${COMPONENT_NAME}`;
ColorSchemePaletteColor.theme = colorSchemeRoleTheme;
