import type { IOsColorScheme } from '../theme.types';

export const isValidColorScheme = (value: unknown): value is IOsColorScheme =>
  value === 'auto' || value === 'dark' || value === 'light';
