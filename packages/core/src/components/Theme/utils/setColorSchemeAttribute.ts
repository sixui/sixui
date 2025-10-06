import type { IOsColorScheme } from '../theme.types';

export const setColorSchemeAttribute = (
  colorScheme: IOsColorScheme,
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
