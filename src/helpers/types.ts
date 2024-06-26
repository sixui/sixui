import type {
  CompiledStyles,
  InlineStyles,
  StyleXArray,
  StyleXStyles,
  StyleXVar,
  Theme,
  UserAuthoredStyles,
  VarGroup,
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

export type IStyles<TKey extends string> = {
  [key in TKey]?: UserAuthoredStyles | ((...props: IAny) => UserAuthoredStyles);
};

export type ICompiledStyles<TKey extends string> = {
  [key in TKey]?: CompiledStyles;
};

export type IStyleVars<TKey extends string> = {
  [key in TKey]: string | StyleXVar<string>;
};

export type IStyleVarGroup<TKey extends string> = VarGroup<IStyleVars<TKey>>;

export type IStyleVarsTheme<TKey extends string> = Theme<IStyleVarGroup<TKey>>;

export type IZeroOrMore<T> = undefined | T | Array<T | undefined>;

export type IArrayElement<TArray> =
  TArray extends ReadonlyArray<infer TElementType> ? TElementType : TArray;

export type IStyleXStyles =
  | StyleXStyles
  | ReadonlyArray<
      StyleXArray<
        | (null | undefined | CompiledStyles)
        | boolean
        | Readonly<[CompiledStyles, InlineStyles]>
      >
    >;

export type IContainerProps<TStyleKey extends string = never> = {
  styles?: IZeroOrMore<ICompiledStyles<TStyleKey>>;
  sx?: IStyleXStyles;
  'data-cy'?: string;
};

export type IRange = {
  min: number;
  max: number;
};

// Omit with keys type checks
export type IOmit<TType, TKeys extends keyof TType> = Omit<TType, TKeys>;

export type IFormFieldProps<TValue, TElement = HTMLElement> = {
  onChange?: (value: TValue, event?: React.SyntheticEvent<TElement>) => void;
  onBlur?: React.FocusEventHandler<TElement>;
  value?: TValue;
  disabled?: boolean;
  name?: string;
};
