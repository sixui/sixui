import {
  SchemeContent,
  SchemeExpressive,
  SchemeFidelity,
  SchemeFruitSalad,
  SchemeMonochrome,
  SchemeNeutral,
  SchemeRainbow,
  SchemeTonalSpot,
  SchemeVibrant,
} from '@material/material-color-utilities';
import { SixuiMaterialDynamicScheme } from './materialDynamicSchemes';

export enum IDynamicSchemeVariant {
  /**
   * A scheme that places the source color in `Scheme.primaryContainer`.
   *
   * Primary Container is the source color, adjusted for color relativity. It
   * maintains constant appearance in light mode and dark mode. This adds ~5
   * tone in light mode, and subtracts ~5 tone in dark mode. Tertiary Container
   * is the complement to the source color, using `TemperatureCache`. It also
   * maintains constant appearance.
   */
  content,

  /**
   * A Dynamic Color theme that is intentionally detached from the source color.
   */
  expressive,

  /**
   * A scheme that places the source color in `Scheme.primaryContainer`.
   *
   * Primary Container is the source color, adjusted for color relativity. It
   * maintains constant appearance in light mode and dark mode. This adds ~5
   * tone in light mode, and subtracts ~5 tone in dark mode. Tertiary Container
   * is the complement to the source color, using `TemperatureCache`. It also
   * maintains constant appearance.
   */
  fidelity,

  /**
   * A playful theme - the source color's hue does not appear in the theme.
   */
  fruitSalad,

  /**
   * A Dynamic Color theme that is grayscale.
   */
  monochrome,

  /**
   * A Dynamic Color theme that is near grayscale.
   */
  neutral,

  /**
   * A playful theme - the source color's hue does not appear in the theme.
   */
  rainbow,

  /**
   * A Dynamic Color theme with low to medium colorfulness and a Tertiary
   * TonalPalette with a hue related to the source color.
   *
   * The default Material You theme on Android 12 and 13.
   */
  tonalSpot,

  /**
   * A Dynamic Color theme that maxes out colorfulness at each position in the
   * Primary Tonal Palette.
   */
  vibrant,

  sixui,
}

const materialDynamicSchemeClasses: Record<
  IDynamicSchemeVariant,
  typeof SchemeTonalSpot
> = {
  [IDynamicSchemeVariant.content]: SchemeContent,
  [IDynamicSchemeVariant.expressive]: SchemeExpressive,
  [IDynamicSchemeVariant.fidelity]: SchemeFidelity,
  [IDynamicSchemeVariant.fruitSalad]: SchemeFruitSalad,
  [IDynamicSchemeVariant.monochrome]: SchemeMonochrome,
  [IDynamicSchemeVariant.neutral]: SchemeNeutral,
  [IDynamicSchemeVariant.rainbow]: SchemeRainbow,
  [IDynamicSchemeVariant.tonalSpot]: SchemeTonalSpot,
  [IDynamicSchemeVariant.vibrant]: SchemeVibrant,
  [IDynamicSchemeVariant.sixui]: SixuiMaterialDynamicScheme,
};

export const getMaterialDynamicSchemeClass = (
  variant: IDynamicSchemeVariant,
): typeof SchemeTonalSpot => materialDynamicSchemeClasses[variant];
