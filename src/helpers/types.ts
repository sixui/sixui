import type { Alignment, Side } from '@floating-ui/core';
import type {
  CompiledStyles,
  StyleXStyles,
  UserAuthoredStyles,
} from '@stylexjs/stylex/lib/StyleXTypes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IAny = any;

export type IMaybeAsync<TReturnType> = TReturnType | Promise<TReturnType>;

export type IDeepPartial<TType> = TType extends object
  ? TType extends Array<infer U>
    ? { [P in keyof TType]: IDeepPartial<U> }
    : { [P in keyof TType]?: IDeepPartial<TType[P]> }
  : TType;

export type IMakeOptional<TType, TKey extends keyof TType> = Omit<TType, TKey> &
  Partial<Pick<TType, TKey>>;

export type IMakeRequired<TType, TKey extends keyof TType> = Omit<TType, TKey> &
  Required<Pick<TType, TKey>>;

export type IPoint = {
  x: number;
  y: number;
};

export type IStaticStyles<TKey extends string> = {
  [key in TKey]?: UserAuthoredStyles;
};

/**
 * @deprectated - delete
 */
export type IStyles<TKey extends string> = {
  [key in TKey]?: UserAuthoredStyles | ((...props: IAny) => UserAuthoredStyles);
};

export type ICompiledStyles<TKey extends string> = {
  [key in TKey]?: CompiledStyles;
};

export type IZeroOrMore<T> = undefined | T | Array<T | undefined>;

export type IOneOrMore<T> = T | Array<T | undefined>;

export type IArrayElement<TArray> =
  TArray extends ReadonlyArray<infer TElementType> ? TElementType : TArray;

export type IStyleXStyles =
  | StyleXStyles
  | CompiledStyles
  | Array<IStyleXStyles>;

export type IRange = {
  min: number;
  max: number;
};

// Omit with keys type checks
export type IOmit<TType, TKeys extends keyof TType> = Omit<TType, TKeys>;

export type ICssSizeValue = number | string;

export type IPosition = {
  x: number;
  y: number;
};

export type ISize<TSize = number> = {
  width: TSize;
  height: TSize;
};

export type IOrientation = 'vertical' | 'horizontal';

export type IHslColor = {
  hue: number;
  saturation: number;
  lightness: number;
};

export type INestedArray<T> = T | Array<INestedArray<T>>;

export type INestedObject<T> = {
  [key: string]: T | INestedObject<T>;
};

export type IPlacement = {
  /**
   * The side of the element relative to a reference element. This is an
   * alternative way to specify the placement. Possible values are: `top`,
   * `right`, `bottom`, `left`.
   */
  side: Side;

  /**
   * The alignment of the element relative to a reference element. This is an
   * alternative way to specify the placement. Possible values are: `start`,
   * `end`.
   */
  alignment?: Alignment;
};
