import { createSequence } from '@olivierpascal/helpers';

import type { IHslColorPickerContentThemeFactory } from './HslColorPickerContent.css';
import type { IHslColorPickerContentFactory } from './HslColorPickerContent.types';
import { ColorPickerContent } from '~/components/ColorPickerContent';
import { generateAnalogousColorPalette } from '~/helpers/colors/generateAnalogousPalette';
import { generateAnalogousColorPalettes } from '~/helpers/colors/generateAnalogousPalettes';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { hslColorPickerContentTheme } from './HslColorPickerContent.css';

const COMPONENT_NAME = 'HslColorPickerContent';

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
HslColorPickerContent.displayName = `@sixui/${COMPONENT_NAME}`;
