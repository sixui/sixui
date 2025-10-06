import { IUseMediaQueryOptions, useMediaQuery } from './useMediaQuery';

export type IUseOsColorScheme = 'dark' | 'light';

export const useOsColorScheme = (
  initialValue?: IUseOsColorScheme,
  options?: IUseMediaQueryOptions,
): IUseOsColorScheme =>
  useMediaQuery(
    '(prefers-color-scheme: dark)',
    initialValue === 'dark',
    options,
  )
    ? 'dark'
    : 'light';
