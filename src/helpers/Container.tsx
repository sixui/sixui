import type { StyleXStyles } from '@stylexjs/stylex';

import type { IVisualState } from '@/hooks/useVisualState';
import type { IZeroOrMore, ICompiledStyles, IStyleVarsTheme } from './types';

export interface IContainer<
  IStyleKey extends string = never,
  IStyleVarKey extends string = never,
> {
  visualState?: IVisualState;
  styles?: IZeroOrMore<ICompiledStyles<IStyleKey>>;
  theme?: IZeroOrMore<IStyleVarsTheme<IStyleVarKey>>;
  sx?: StyleXStyles;
}
