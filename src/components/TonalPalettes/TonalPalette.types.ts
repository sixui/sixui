import type { ITonalPalettesThemeVars } from '@/themes/base/tonalPalettes.types';

export type ITone = { luminance: number; key: keyof ITonalPalettesThemeVars };

export type ITonalPaletteProps = {
  tones: Array<ITone>;
};
