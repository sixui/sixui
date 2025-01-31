import { stripDiacritics } from './stripDiacritics';

export type INormalizeStringOptions = {
  trim?: boolean;
  ignoreCase?: boolean;
  ignoreAccents?: boolean;
};

const defaultOptions: Partial<INormalizeStringOptions> = {
  trim: true,
  ignoreCase: true,
  ignoreAccents: true,
};

export const normalizeString = (
  input: string,
  userOptions?: INormalizeStringOptions,
): string => {
  const options: INormalizeStringOptions = {
    ...defaultOptions,
    ...userOptions,
  };
  const { trim, ignoreCase, ignoreAccents } = options;

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
