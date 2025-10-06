import type { IOsColorScheme } from '../theme.types';

export interface IColorSchemeManager {
  get: (defaultValue: IOsColorScheme) => IOsColorScheme;
  set: (value: IOsColorScheme) => void;
  subscribe: (onUpdate: (colorScheme: IOsColorScheme) => void) => void;
  unsubscribe: () => void;
  clear: () => void;
}
