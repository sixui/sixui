import type {
  IZeroOrMore,
  ICompiledStyles,
  IStyleXStyles,
} from '@/helpers/types';

export type IContainerProps<IStyleKey extends string = never> = {
  styles?: IZeroOrMore<ICompiledStyles<IStyleKey>>;
  sx?: IStyleXStyles;
};
