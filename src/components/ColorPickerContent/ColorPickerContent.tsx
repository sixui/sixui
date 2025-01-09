import type { IColorPickerContentThemeFactory } from './ColorPickerContent.css';
import type { IColorPickerContentFactory } from './ColorPickerContent.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import {
  colorPickerContentTheme,
  colorPickerContentThemeVariants,
} from './ColorPickerContent.css';

const COMPONENT_NAME = 'ColorPickerContent';

export const ColorPickerContent = componentFactory<IColorPickerContentFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'primary',
      children,
      disabled,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IColorPickerContentThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: colorPickerContentTheme,
      themeVariants: colorPickerContentThemeVariants,
      modifiers: {
        disabled,
      },
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        {children}
      </Box>
    );
  },
);

ColorPickerContent.theme = colorPickerContentTheme;
ColorPickerContent.displayName = `@sixui/${COMPONENT_NAME}`;
