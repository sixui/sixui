import { isObject } from '~/helpers/isObject';
import { INestedObject } from '~/helpers/types';

type IContract = INestedObject<string | null>;
type ITokens = INestedObject<string | null | undefined>;
type IStyles = Record<string, string>;

export const partialAssignInlineVars = (
  contract: IContract,
  tokens: ITokens,
): IStyles => {
  const styles: IStyles = {};

  for (const key in tokens) {
    if (isObject(contract[key]) && isObject(tokens[key])) {
      Object.assign(
        styles,
        partialAssignInlineVars(contract[key], tokens[key]),
      );
    } else if (
      typeof contract[key] === 'string' &&
      typeof tokens[key] === 'string'
    ) {
      const varName = contract[key].substring(4, contract[key].length - 1);
      styles[varName] = tokens[key];
    }
  }

  return styles;
};
