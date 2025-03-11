import type { IHctColorPickerContentFactory } from './HctColorPickerContent.types';
import { ColorPickerContent } from '~/components/ColorPickerContent';
import { useProps } from '~/components/Theme';
import { useThemeContext } from '~/components/Theme/Theme.context';
import { generateTonalColorPalettes } from '~/utils/colors/generateTonalColorPalettes';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './HctColorPickerContent.constants';
import { hctColorPickerContentTheme } from './HctColorPickerContent.css';

/**
 * @see https://m3.material.io/blog/science-of-color-design
 */
export const HctColorPickerContent =
  componentFactory<IHctColorPickerContentFactory>((props, forwardedRef) => {
    const {
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

    return (
      <ColorPickerContent palettes={palettes} ref={forwardedRef} {...other} />
    );
  });

HctColorPickerContent.displayName = `@sixui/core/${COMPONENT_NAME}`;
HctColorPickerContent.theme = hctColorPickerContentTheme;
