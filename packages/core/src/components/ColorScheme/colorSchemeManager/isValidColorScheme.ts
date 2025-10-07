import type { IColorScheme } from '~/components/Theme/theme.types';

export const isValidColorScheme = (value: unknown): value is IColorScheme =>
  value === 'auto' || value === 'dark' || value === 'light';
