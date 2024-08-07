import type {
  ICompiledStyles,
  IStyleXStyles,
  IZeroOrMore,
} from '~/helpers/types';
import type { IVisualState } from '../VisualState';

export type IBaseProps<TStyleKey extends string = never> = {
  styles?: IZeroOrMore<ICompiledStyles<TStyleKey>>;
  sx?: IStyleXStyles;
  visualState?: IVisualState;
};
