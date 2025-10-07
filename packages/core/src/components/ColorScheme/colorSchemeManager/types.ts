import type { IColorScheme } from '~/components/Theme/theme.types';

export interface IColorSchemeManager {
  get: (defaultValue: IColorScheme) => IColorScheme;
  set: (value: IColorScheme) => void;
  subscribe: (onUpdate: (colorScheme: IColorScheme) => void) => void;
  unsubscribe: () => void;
  clear: () => void;
}
