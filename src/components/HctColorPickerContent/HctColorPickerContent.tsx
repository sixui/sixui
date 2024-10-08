import { forwardRef } from 'react';

import type { IHctColorPickerContentProps } from './HctColorPickerContent.types';
import baseTheme from '~/themes/base/theme.json';
import { generateTonalColorPalettes } from '~/helpers/colors/generateTonalColorPalettes';
import { useThemeContext } from '../Theme';
import { ColorPickerContent } from '../ColorPickerContent';

export const HctColorPickerContent = forwardRef<
  HTMLDivElement,
  IHctColorPickerContentProps
>(function HctColorPickerContent(props, forwardedRef) {
  const {
    sourceColor: sourceColorProp,
    hueCount = 8,
    tones = [85, 70, 55, 40, 25],
    hideNeutral,
    ...other
  } = props;

  const themeContext = useThemeContext();

  const sourceColor =
    sourceColorProp ??
    themeContext.theme.source.color ??
    baseTheme.source.color;
  const palettes = generateTonalColorPalettes(
    sourceColor,
    hueCount,
    tones,
    hideNeutral,
  );

  return (
    <ColorPickerContent
      styles={other.innerStyles?.colorPickerContent}
      palettes={palettes}
      {...other}
      ref={forwardedRef}
    />
  );
});
