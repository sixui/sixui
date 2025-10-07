import type { IColorScheme } from '../theme.types';

export const setColorSchemeAttribute = (
  colorScheme: IColorScheme,
  getRootElement: () => HTMLElement | undefined,
): void => {
  const hasDarkColorScheme =
    typeof window !== 'undefined' &&
    'matchMedia' in window &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const computedColorScheme =
    colorScheme !== 'auto'
      ? colorScheme
      : hasDarkColorScheme
        ? 'dark'
        : 'light';
  getRootElement()?.setAttribute(
    'data-sixui-color-scheme',
    computedColorScheme,
  );
};
