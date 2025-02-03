import type { IHctColorPickerContentThemeFactory } from './HctColorPickerContent.css';
import type { IHctColorPickerContentFactory } from './HctColorPickerContent.types';
import { ColorPickerContent } from '~/components/ColorPickerContent';
import {
  useComponentTheme,
  useProps,
  useThemeContext,
} from '~/components/Theme';
import { generateTonalColorPalettes } from '~/utils/colors/generateTonalColorPalettes';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './HctColorPickerContent.constants';
import { hctColorPickerContentTheme } from './HctColorPickerContent.css';

export const HctColorPickerContent =
  componentFactory<IHctColorPickerContentFactory>((props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      sourceColor: sourceColorProp,
      hueCount = 8,
      tones = [85, 70, 55, 40, 25],
      hideNeutral,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });
    const themeContext = useThemeContext();

    const sourceColor = sourceColorProp ?? themeContext.theme.seed.color;
    const palettes = generateTonalColorPalettes(
      sourceColor,
      hueCount,
      tones,
      hideNeutral,
    );

    const { getStyles } = useComponentTheme<IHctColorPickerContentThemeFactory>(
      {
        componentName: COMPONENT_NAME,
        classNames,
        className,
        styles,
        style,
        variant,
        theme: hctColorPickerContentTheme,
      },
    );

    return (
      <ColorPickerContent
        {...getStyles('root')}
        palettes={palettes}
        ref={forwardedRef}
        {...other}
      />
    );
  });

HctColorPickerContent.theme = hctColorPickerContentTheme;
HctColorPickerContent.displayName = `@sixui/core/${COMPONENT_NAME}`;
