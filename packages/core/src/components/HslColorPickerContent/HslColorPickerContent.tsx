import { createSequence } from '@olivierpascal/helpers';

import type { IHslColorPickerContentFactory } from './HslColorPickerContent.types';
import { ColorPickerContent } from '~/components/ColorPickerContent';
import { useProps } from '~/components/Theme';
import { generateAnalogousColorPalette } from '~/utils/colors/generateAnalogousColorPalette';
import { generateAnalogousColorPalettes } from '~/utils/colors/generateAnalogousColorPalettes';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './HslColorPickerContent.constants';

export const HslColorPickerContent =
  componentFactory<IHslColorPickerContentFactory>((props, forwardedRef) => {
    const {
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

    return (
      <ColorPickerContent palettes={palettes} ref={forwardedRef} {...other} />
    );
  });

HslColorPickerContent.displayName = `@sixui/core/${COMPONENT_NAME}`;
