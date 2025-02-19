import { createSequence } from '@olivierpascal/helpers';

import type { IHslColorPickerContentThemeFactory } from './HslColorPickerContent.css';
import type { IHslColorPickerContentFactory } from './HslColorPickerContent.types';
import { ColorPickerContent } from '~/components/ColorPickerContent';
import { useComponentTheme, useProps } from '~/components/Theme';
import { generateAnalogousColorPalette } from '~/utils/colors/generateAnalogousColorPalette';
import { generateAnalogousColorPalettes } from '~/utils/colors/generateAnalogousColorPalettes';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './HslColorPickerContent.constants';
import { hslColorPickerContentTheme } from './HslColorPickerContent.css';

export const HslColorPickerContent =
  componentFactory<IHslColorPickerContentFactory>((props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      hueCount = 8,
      saturation = 80,
      lightnesses = [80, 65, 50, 35, 20],
      hideNeutral,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const palettes = generateAnalogousColorPalettes(
      saturation,
      hueCount,
      lightnesses,
    );

    if (!hideNeutral) {
      palettes.push(
        generateAnalogousColorPalette(
          0,
          0,
          createSequence(
            lightnesses.length,
            0,
            100 / (lightnesses.length - 1),
          ).reverse(),
        ),
      );
    }

    const { getStyles } = useComponentTheme<IHslColorPickerContentThemeFactory>(
      {
        componentName: COMPONENT_NAME,
        classNames,
        className,
        styles,
        style,
        variant,
        theme: hslColorPickerContentTheme,
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

HslColorPickerContent.theme = hslColorPickerContentTheme;
HslColorPickerContent.displayName = `@sixui/core/${COMPONENT_NAME}`;
