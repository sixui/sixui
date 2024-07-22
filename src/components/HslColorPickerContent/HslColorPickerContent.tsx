import { forwardRef } from 'react';
import { createSequence } from '@olivierpascal/helpers';

import type { IHslColorPickerContentProps } from './HslColorPickerContent.types';
import { generateAnalogousColorPalettes } from '@/helpers/colors/generateAnalogousPalettes';
import { ColorPickerContent } from '@/components/ColorPickerContent';
import { generateAnalogousColorPalette } from '@/helpers/colors/generateAnalogousPalette';

export const HslColorPickerContent = forwardRef<
  HTMLDivElement,
  IHslColorPickerContentProps
>(function HslColorPickerContent(props, forwardedRef) {
  const {
    hueCount = 8,
    saturation = 80,
    lightnesses = [80, 65, 50, 35, 20],
    noGrayscale,
    ...other
  } = props;

  const palettes = generateAnalogousColorPalettes(
    saturation,
    hueCount,
    lightnesses,
  );

  if (!noGrayscale) {
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
    <ColorPickerContent
      styles={other.innerStyles?.colorPickerContent}
      {...other}
      palettes={palettes}
      ref={forwardedRef}
    />
  );
});
