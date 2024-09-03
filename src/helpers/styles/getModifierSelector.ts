import { getDataAttributes, type IModifiers } from '~/utils/getDataAttributes';

type IOperator = '=' | '^=' | '$=' | '~=' | '*=' | '|=' | '?=' | '!=';

export const getModifierSelector = <TModifier extends string = string>(
  modifier:
    | TModifier
    | `${TModifier}${IOperator}${string}`
    | Partial<IModifiers<TModifier>>,
  parent?: string,
): string => {
  const modifiers =
    typeof modifier === 'string'
      ? `[data-${modifier}]`
      : Object.entries(getDataAttributes(modifier)).reduce(
          (acc, [key, value]) => `${acc}[${key}="${value}"]`,
          '',
        );

  const selector = `${parent ?? '&'}:where(${modifiers})${parent ? ' &' : ''}`;

  return selector;
};
