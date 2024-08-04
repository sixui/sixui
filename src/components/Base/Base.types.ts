import type {
  ICompiledStyles,
  IStyleXStyles,
  IZeroOrMore,
} from '~/helpers/types';

export type IBaseProps<TStyleKey extends string = never> = {
  styles?: IZeroOrMore<ICompiledStyles<TStyleKey>>;
  sx?: IStyleXStyles;
};
