import type { PartialDeep } from 'type-fest';

import { createSafeContext } from '~/utils/react/createSafeContext';
import { ITheme } from './theme.types';

export type IThemeSetterContextValue = {
  setTheme: (theme: PartialDeep<ITheme> | undefined) => void;
};

export const [ThemeSetterProvider, useThemeSetterContext] =
  createSafeContext<IThemeSetterContextValue>(
    'You forgot to wrap your component in <ThemeSetterProvider />.',
  );
