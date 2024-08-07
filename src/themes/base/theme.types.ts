import type { IColorSchemeVariant } from '~/components/ColorScheme';
import type { IColorScheme } from './colorScheme.types';
import type { IMotionTheme } from './motion.types';
import type { IShapeTheme } from './shape.types';
import type { ITypeFaceTheme } from './typeFace.types';
import type { ITypeScaleTheme } from './typeScale.types';
import type { IStateTheme } from './state.types';
import type { IZIndexTheme } from './zIndex.types';
import type { IDensityTheme } from './density.types';
import { ISpacingTheme } from './spacing.types';
import { IScaleTheme } from './scale.types';
import { IOutlineTheme } from './outline.types';

export type IThemeSchemes = Record<IColorSchemeVariant, IColorScheme>;

export type ITheme = {
  name: string;
  source: {
    color: string;
    schemeVariant: string;
    contrast: number;
  };
  schemes?: IThemeSchemes;
  scale?: IScaleTheme;
  shape?: IShapeTheme;
  motion?: IMotionTheme;
  typeFace?: ITypeFaceTheme;
  typeScale?: ITypeScaleTheme;
  state?: IStateTheme;
  zIndex?: IZIndexTheme;
  density?: IDensityTheme;
  spacing?: ISpacingTheme;
  outline?: IOutlineTheme;
};
