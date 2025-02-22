import type { INestedObject } from '~/utils/types';

type IThemeValues<T> = T extends object ? IPartialObjectDeep<T> : string;

type IPartialObjectDeep<TObjectType extends object> = {
  [KeyType in keyof TObjectType]?: IThemeValues<TObjectType[KeyType]>;
};

type ITokens = INestedObject<string>;

export const overrideTokens = <TTokens extends ITokens>(
  tokens: TTokens,
  values: IThemeValues<TTokens>,
): Record<string, string> =>
  Object.entries(values).reduce<Record<string, string>>((acc, [key, value]) => {
    const tokenValue = tokens[key as keyof TTokens];

    if (typeof value === 'string') {
      if (!tokenValue) {
        return acc;
      }

      return {
        ...acc,
        [tokenValue as string]: value,
      };
    }

    return {
      ...acc,
      ...overrideTokens(tokenValue as ITokens, value as IThemeValues<ITokens>),
    };
  }, {});
