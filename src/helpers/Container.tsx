import type { IVisualState } from '@/hooks/useVisualState';
import type { ICompiledStyles, IStyleVarsTheme } from './types';

export interface IContainer<
  IStyleKey extends string,
  IStyleVarKey extends string = never,
> {
  visualState?: IVisualState;
  styles?: ICompiledStyles<IStyleKey> | Array<ICompiledStyles<IStyleKey>>;
  theme?: IStyleVarsTheme<IStyleVarKey>;
}
