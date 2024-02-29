import type {
  CompiledStyles,
  StyleXVar,
  Theme,
  UserAuthoredStyles,
  VarGroup,
} from '@stylexjs/stylex/lib/StyleXTypes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IAny = any;

export type IMaybeAsync<TReturnType> = TReturnType | Promise<TReturnType>;

export type ISvgIcon = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & React.RefAttributes<SVGSVGElement>
>;

export type IDeepPartial<TType> = TType extends object
  ? TType extends Array<infer U>
    ? { [P in keyof TType]: IDeepPartial<U> }
    : { [P in keyof TType]?: IDeepPartial<TType[P]> }
  : TType;

export type IMakeOptional<TType, TKey extends keyof TType> = Omit<TType, TKey> &
  Partial<Pick<TType, TKey>>;

export type IMakeRequired<TType, TKey extends keyof TType> = Omit<TType, TKey> &
  Required<Pick<TType, TKey>>;

export interface IPoint {
  x: number;
  y: number;
}

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
  TArray extends readonly (infer TElementType)[] ? TElementType : TArray;
