// Inspiration:
// https://github.com/material-foundation/material-color-utilities/blob/61bdf870fa96912abeb34ba2b05725f51bac625d/typescript/scheme/scheme_vibrant.ts

import {
  DynamicScheme,
  Hct,
  TonalPalette,
} from '@material/material-color-utilities';

/**
 * A Dynamic Color theme that maxes out colorfulness at each position in the
 * Primary Tonal Palette.
 */
export class SixuiMaterialDynamicScheme extends DynamicScheme {
  /**
   * Hues (in degrees) used at breakpoints such that designers can specify a
   * hue rotation that occurs at a given break point.
   */
  private static readonly hues = [
    0.0, 41.0, 61.0, 101.0, 131.0, 181.0, 251.0, 301.0, 360.0,
  ];

  /**
   * Hue rotations (in degrees) of the Tertiary [TonalPalette],
   * corresponding to the breakpoints in [hues].
   */
  private static readonly tertiaryRotations = [
    35.0, 30.0, 20.0, 25.0, 30.0, 35.0, 30.0, 25.0, 25.0,
  ];

  public constructor(
    sourceColorHct: Hct,
    isDark: boolean,
    contrastLevel: number,
  ) {
    const sourceColorArgb = sourceColorHct.toInt();

    super({
      sourceColorArgb,
      variant: 3,
      contrastLevel,
      isDark,
      primaryPalette: TonalPalette.fromHueAndChroma(
        sourceColorHct.hue,
        sourceColorHct.chroma,
      ),
      secondaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 16.0),
      tertiaryPalette: TonalPalette.fromHueAndChroma(
        DynamicScheme.getRotatedHue(
          sourceColorHct,
          SixuiMaterialDynamicScheme.hues,
          SixuiMaterialDynamicScheme.tertiaryRotations,
        ),
        24.0,
      ),
      neutralPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 3.0),
      neutralVariantPalette: TonalPalette.fromHueAndChroma(
        sourceColorHct.hue,
        6.0,
      ),
    });
  }
}
