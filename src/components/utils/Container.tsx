import type { StyleXStyles } from '@stylexjs/stylex';

import type {
  IZeroOrMore,
  ICompiledStyles,
  IStyleVarsTheme,
} from '@/helpers/types';
import type { IVisualState } from '@/hooks/useVisualState';

export type IContainerProps<
  IStyleKey extends string = never,
  IStyleVarKey extends string = never,
> = {
  visualState?: IVisualState;
  styles?: IZeroOrMore<ICompiledStyles<IStyleKey>>;
  theme?: IZeroOrMore<IStyleVarsTheme<IStyleVarKey>>;
  sx?: StyleXStyles;
};
