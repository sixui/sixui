import type { IAny } from '~/helpers/types';

type IPrimitive = string | boolean | number | null | undefined;

export type IVeMapLeafNodes<TObj, TLeafType> = {
  [Prop in keyof TObj]: TObj[Prop] extends IPrimitive
    ? TLeafType
    : TObj[Prop] extends Record<string | number, IAny>
      ? IVeMapLeafNodes<TObj[Prop], TLeafType>
      : never;
};

export type IVeCSSVarFunction =
  | `var(--${string})`
  | `var(--${string}, ${string | number})`;

type INullableTokens = {
  [key: string]: string | INullableTokens | null;
};

export type IVeTokens = {
  [key: string]: string | IVeTokens;
};

export type IVeWithOptionalLayer<T extends IVeTokens> = T & {
  '@layer'?: string;
};

export type IVeThemeVars<TThemeContract extends INullableTokens> =
  IVeMapLeafNodes<TThemeContract, IVeCSSVarFunction>;

type IContract = {
  [key: string]: IVeCSSVarFunction | null | IContract;
};

export type IVeContractTokens<TThemeContract extends IContract> =
  IVeWithOptionalLayer<IVeMapLeafNodes<TThemeContract, string>>;
