import type { CSSPropertiesWithExtras } from '@stylexjs/stylex/lib/StyleXTypes';

import type { IVisualState } from '@/hooks/useVisualState';
import type { IZeroOrMore, ICompiledStyles, IStyleVarsTheme } from './types';

export interface IContainer<
  IStyleKey extends string,
  IStyleVarKey extends string = never,
> {
  visualState?: IVisualState;
  styles?: IZeroOrMore<ICompiledStyles<IStyleKey>>;
  theme?: IZeroOrMore<IStyleVarsTheme<IStyleVarKey>>;
  sx?: CSSPropertiesWithExtras;
}
