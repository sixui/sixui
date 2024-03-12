import { stripDiacritics } from './stripDiacritics';

export type INormalizeStringOptions = {
  trim?: boolean;
  ignoreCase?: boolean;
  ignoreAccents?: boolean;
};

const defaultOptions: INormalizeStringOptions = {
  trim: true,
  ignoreCase: true,
  ignoreAccents: true,
};

export const normalizeString = (
  input: string,
  options?: INormalizeStringOptions,
): string => {
  const { trim, ignoreCase, ignoreAccents } = {
    ...defaultOptions,
    ...options,
  };

  const inputTrimPass = trim ? input.trim() : input;
  const inputCasePass = ignoreCase
    ? inputTrimPass.toLowerCase()
    : inputTrimPass;
  const inputAccentsPass = ignoreAccents
    ? stripDiacritics(inputCasePass)
    : inputCasePass;
  const normalizedInput = inputAccentsPass;

  return normalizedInput;
};
