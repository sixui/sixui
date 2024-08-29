export type IModifiers = Record<string, string | number | boolean | undefined>;

export const getDataAttributes = (
  modifiers: IModifiers,
): Record<string, string> =>
  Object.entries(modifiers).reduce((acc, [key, value]) => {
    if (
      value === undefined ||
      value === '' ||
      value === false ||
      value === null
    ) {
      return acc;
    }

    return {
      ...acc,
      [`data-${key}`]: String(value),
    };
  }, {});
