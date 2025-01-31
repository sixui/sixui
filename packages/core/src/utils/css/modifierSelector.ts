import type { IModifiers } from '~/utils/getDataAttributes';

type IOperator = '=' | '^=' | '$=' | '~=' | '*=' | '|=' | '?=' | '!=';

type IModifier<TModifier extends string = string> =
  | TModifier
  | `${TModifier}${IOperator}${string}`
  | `!${TModifier}`
  | Partial<IModifiers<TModifier>>
  | Array<IModifier<TModifier>>;

const compileModifier = <TModifier extends string = string>(
  modifier: IModifier<TModifier>,
): string =>
  typeof modifier === 'string'
    ? modifier.startsWith('!')
      ? `:not([data-${modifier.slice(1)}])`
      : `[data-${modifier}]`
    : Array.isArray(modifier)
      ? modifier.map((modifier) => compileModifier(modifier)).join('')
      : Object.entries(
          Object.entries(modifier).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [`data-${key}`]: value,
            }),
            {},
          ),
        ).reduce(
          (acc, [key, value]) =>
            typeof value === 'string' ||
            typeof value === 'number' ||
            value === true
              ? `${acc}[${key}="${value}"]`
              : `${acc}:not([${key}])`,
          '',
        );

export const modifierSelector = <TModifier extends string = string>(
  modifier: IModifier<TModifier>,
  parent?: string,
): string => {
  const modifiers = compileModifier(modifier);
  const selector = `${parent ?? '&'}:where(${modifiers})${parent ? ' &' : ''}`;

  return selector;
};
