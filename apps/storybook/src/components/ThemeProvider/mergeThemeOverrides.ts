import type { ITheme, IThemeOverride } from './theme.types';
import { deepMerge } from '~/helpers/deepMerge';

export const mergeThemeOverrides = (
  theme: ITheme,
  ...overrides: Array<IThemeOverride | undefined>
): ITheme =>
  [
    theme,
    ...overrides.filter((override): override is IThemeOverride =>
      Boolean(override),
    ),
  ].reduce((acc, override) => deepMerge(acc, override), {}) as ITheme;
