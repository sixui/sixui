import type { IBaseProps } from '~/components/Base';

export type ITone = { luminance: number; color: string };

export type ITonalPaletteProps = IBaseProps & {
  tones: Array<ITone>;
};
