import { kebabCaseFromCamelCase } from '~/utils/kebabCaseFromCamelCase';

export const getCssPropertyRawKey = (key: string): string =>
  key.startsWith('--')
    ? key
    : key.startsWith('var(')
      ? key.substring('var('.length, key.length - ')'.length)
      : key.startsWith('env(')
        ? key.substring('env('.length, key.length - ')'.length)
        : kebabCaseFromCamelCase(key);
