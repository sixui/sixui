import type { IColorSchemeVariant } from '@/components/ColorScheme';
import type { IColorScheme } from './colorScheme.types';
import type { IMotionTheme } from './motion.types';
import type { IShapeTheme } from './shape.types';
import type { ITypeFaceTheme } from './typeFace.types';
import type { ITypeScaleTheme } from './typeScale.types';

export type ITheme = {
  name: string;
  source: {
    color: string;
    schemeVariant: string;
    contrast: number;
  };
  schemes?: Record<IColorSchemeVariant, IColorScheme>;
  shape?: IShapeTheme;
  motion?: IMotionTheme;
  typeFace?: ITypeFaceTheme;
  typeScale?: ITypeScaleTheme;
};