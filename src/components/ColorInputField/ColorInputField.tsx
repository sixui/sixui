import type { IColorInputFieldThemeFactory } from './ColorInputField.css';
import type { IColorInputFieldFactory } from './ColorInputField.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { colorInputFieldTheme } from './ColorInputField.css';

const COMPONENT_NAME = 'ColorInputField';

export const ColorInputField = componentFactory<IColorInputFieldFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      disabled,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IColorInputFieldThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: colorInputFieldTheme,
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        {children}
      </Box>
    );
  },
);

ColorInputField.theme = colorInputFieldTheme;
ColorInputField.displayName = `@sixui/${COMPONENT_NAME}`;
