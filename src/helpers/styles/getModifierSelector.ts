import { getDataAttributes, type IModifiers } from '~/utils/getDataAttributes';

type IOperator = '=' | '^=' | '$=' | '~=' | '*=' | '|=' | '?=' | '!=';

type IModifier<TModifier extends string = string> =
  | TModifier
  | `${TModifier}${IOperator}${string}`
  | Partial<IModifiers<TModifier>>
  | Array<IModifier<TModifier>>;

const compileModifier = <TModifier extends string = string>(
  modifier: IModifier<TModifier>,
): string =>
  typeof modifier === 'string'
    ? `[data-${modifier}]`
    : Array.isArray(modifier)
      ? modifier.map((modifier) => compileModifier(modifier)).join('')
      : Object.entries(getDataAttributes(modifier)).reduce(
          (acc, [key, value]) => `${acc}[${key}="${value}"]`,
          '',
        );
export const getModifierSelector = <TModifier extends string = string>(
  modifier: IModifier<TModifier>,
  parent?: string,
): string => {
  const modifiers = compileModifier(modifier);
  const selector = `${parent ?? '&'}:where(${modifiers})${parent ? ' &' : ''}`;

  return selector;
};
