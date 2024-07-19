import { forwardRef, useMemo } from 'react';
import stylex from '@stylexjs/stylex';

import type { IColorPickerContentProps } from './ColorPickerContent.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { basicTemplateStyles } from './ColorPickerContent.styles';
import { Paper } from '../Paper';
import {
  argbFromHex,
  DynamicScheme,
  Hct,
  hexFromArgb,
  TonalPalette,
} from '@material/material-color-utilities';
import { createSequence } from '@olivierpascal/helpers';
import baseTheme from '@/themes/base/theme.json';
import { useThemeContext } from '@/components/Theme';
import {
  useColorScheme,
  type IColorSchemeVariant,
} from '@/components/ColorScheme';
import { isObject } from '@/helpers/isObject';
import type { IColorScheme } from '@/themes/base';
import { commonStyles } from '@/helpers/commonStyles';

const Color: React.FC<{
  background: string;
  foreground: string;
  children?: React.ReactNode;
}> = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: 40,
        padding: 8,
        // borderRadius: 8,
        // height: 64,
        backgroundColor: props.background,
        color: props.foreground,
        // border: '1px solid #ccc',
      }}
    >
      {props.children}
    </div>
  );
};

const generatePalettes = (
  sourceColorHct: Hct,
  count: number,
): Array<TonalPalette> => {
  const rotationStep = 360 / count;
  const rotations = createSequence(360 / rotationStep);
  const hueBreakpoints = [
    0, // red
    30, // orange
    60, // yellow
    90, // yellow-green
    120, // green
    150, // green-cyan
    180, // cyan
    210, // cyan-blue
    240, // blue
    270, // blue-magenta
    300, // magenta
    330, // magenta-red
  ];

  const palettes = rotations.map((rotationIndex) => {
    const rotation = rotationIndex * rotationStep;
    const rotatedColorArgb = DynamicScheme.getRotatedHue(
      sourceColorHct,
      hueBreakpoints,
      [
        rotation, // red
        rotation, // orange
        rotation, // yellow
        rotation, // yellow-green
        rotation, // green
        rotation, // green-cyan
        rotation, // cyan
        rotation, // cyan-blue
        rotation, // blue
        rotation, // blue-magenta
        rotation, // magenta
        rotation, // magenta-red
      ],
    );

    return TonalPalette.fromHueAndChroma(
      rotatedColorArgb,
      sourceColorHct.chroma,
    );
  }, [] as Array<TonalPalette>);

  return palettes;
};

const generateTones = (
  palette: TonalPalette,
  count: number,
  min = 20,
  max = 80,
): Array<{
  luminance: number;
  colorHex: string;
}> => {
  const step = (max - min) / Math.max(count - 1, 1);
  const luminances = createSequence(count, min, step);

  return luminances.map((luminance) => ({
    luminance,
    colorHex: hexFromArgb(palette.tone(luminance)),
  }));
};

export const ColorPickerContent = forwardRef<
  HTMLDivElement,
  IColorPickerContentProps
>(function ColorPickerContent(props, forwardedRef) {
  const {
    styles,
    sx,
    fixedColorScheme,
    sourceColor,
    layer = 'background',
    ...other
  } = props;

  const componentTheme = useComponentTheme('ColorPickerContent');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(basicTemplateStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

  const colorScheme = useColorScheme();
  const themeContext = useThemeContext();

  const themeSchemes = themeContext.theme?.schemes ?? baseTheme.schemes;

  const getSourceColorsHex = (
    token: keyof IColorScheme,
  ): Record<IColorSchemeVariant, string> => {
    const lightSourceColorHex = isObject(sourceColor)
      ? sourceColor.light
      : (sourceColor ?? themeSchemes.light[token]);
    const darkSourceColorHex = isObject(sourceColor)
      ? sourceColor.dark
      : (sourceColor ?? themeSchemes.dark[token]);

    return {
      light: lightSourceColorHex,
      dark: darkSourceColorHex,
    };
  };

  const primaryToken = fixedColorScheme ? 'primaryFixed' : 'primary';
  const sourceColorsHex = getSourceColorsHex(primaryToken);
  const sourceColorHex = sourceColorsHex[colorScheme.variant];

  const paletteSize = 6;

  const sourceColorHct = Hct.fromInt(argbFromHex(sourceColorHex));
  const palettes = generatePalettes(sourceColorHct, paletteSize);

  // const palettes = generatePalettes(darkPrimaryColorHct, 10);

  const luminanceMin = 30;
  const luminanceMax = 50;
  const luminanceCount = 3;

  const complementaryLuminance = 100;

  return (
    <div
      {...sxf(componentTheme.overridenStyles, 'host', sx)}
      {...other}
      ref={forwardedRef}
    >
      <Paper elevation={5}>
        <div {...sxf('inner')}>
          <div {...sxf('grid')}>
            {palettes.map((palette, paletteIndex) => (
              <div
                key={paletteIndex}
                {...stylex.props(
                  commonStyles.verticalLayout,
                  commonStyles.gap$none,
                )}
              >
                <div {...sxf('tones')}>
                  {generateTones(
                    palette,
                    luminanceCount,
                    luminanceMin,
                    luminanceMax,
                  )
                    .reverse()
                    .map((tone, toneIndex) => (
                      <Color
                        key={toneIndex}
                        background={tone.colorHex}
                        foreground={hexFromArgb(
                          palette.tone(complementaryLuminance),
                        )}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Paper>
    </div>
  );
});
