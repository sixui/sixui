import type { ITonalPalettesThemeVars } from '@/themes/base/tonalPalettes.types';

export type ITone = { luminance: number; key: keyof ITonalPalettesThemeVars };

export type ITonalPalette = {
  title: string;
  tones: Array<ITone>;
};

export type ITonalPaletteProps = {
  palette: ITonalPalette;
};
