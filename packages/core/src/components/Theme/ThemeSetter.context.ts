import type { PartialDeep } from 'type-fest';

import type { IColorScheme, ITheme } from './theme.types';
import { createSafeContext } from '~/utils/react/createSafeContext';

export type IThemeSetterContextValue = {
  setTheme: (theme: PartialDeep<ITheme> | undefined) => void;
  setColorScheme: (variant: IColorScheme) => void;
  toggleColorScheme: () => void;
  clearColorScheme: () => void;
};

export const [ThemeSetterProvider, useThemeSetterContext] =
  createSafeContext<IThemeSetterContextValue>(
    'You forgot to wrap your component in <ThemeSetterProvider />.',
  );
