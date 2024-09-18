import type { IColorSchemeVariant } from '~/components/ColorScheme';
import type { IColorScheme } from './colorScheme.types';
import type { IDensityTheme } from './density.types';
import type { IMotionTheme } from './motion.types';
import type { IOutlineTheme } from './outline.types';
import type { IScaleTheme } from './scale.types';
import type { IShapeTheme } from './shape.types';
import type { ISpacingTheme } from './spacing.types';
import type { IStateTheme } from './state.types';
import type { ITypeFaceTheme } from './typeFace.types';
import type { ITypeScaleTheme } from './typeScale.types';
import type { IWindowSizeClassesTheme } from './windowSizeClasses.types';
import type { IZIndexTheme } from './zIndex.types';

export type IThemeSchemes = Record<IColorSchemeVariant, IColorScheme>;

export type ITheme = {
  name: string;
  source: {
    color: string;
    schemeVariant: string;
    contrast: number;
  };
  windowSizeClasses: IWindowSizeClassesTheme;
  schemes?: IThemeSchemes;
  density?: IDensityTheme;
  motion?: IMotionTheme;
  outline?: IOutlineTheme;
  scale?: IScaleTheme;
  shape?: IShapeTheme;
  spacing?: ISpacingTheme;
  state?: IStateTheme;
  typeFace?: ITypeFaceTheme;
  typeScale?: ITypeScaleTheme;
  zIndex?: IZIndexTheme;
};
