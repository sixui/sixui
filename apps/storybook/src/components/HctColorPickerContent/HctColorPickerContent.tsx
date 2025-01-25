import type { IHctColorPickerContentThemeFactory } from './HctColorPickerContent.css';
import type { IHctColorPickerContentFactory } from './HctColorPickerContent.types';
import { ColorPickerContent } from '~/components/ColorPickerContent';
import { useThemeContext } from '~/components/ThemeProvider';
import { generateTonalColorPalettes } from '~/helpers/colors/generateTonalColorPalettes';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { hctColorPickerContentTheme } from './HctColorPickerContent.css';

const COMPONENT_NAME = 'HctColorPickerContent';

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

    const sourceColor = sourceColorProp ?? themeContext.theme.source.color;
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
HctColorPickerContent.displayName = `@sixui/${COMPONENT_NAME}`;
