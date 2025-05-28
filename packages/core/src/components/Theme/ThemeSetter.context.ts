import type { PartialDeep } from 'type-fest';

import type { ITheme, IThemeColorSchemeVariant } from './theme.types';
import { createSafeContext } from '~/utils/react/createSafeContext';

export type IThemeSetterContextValue = {
  setTheme: (theme: PartialDeep<ITheme> | undefined) => void;
  setColorSchemeVariant: (
    colorSchemeVariant: IThemeColorSchemeVariant | undefined,
  ) => void;
};

export const [ThemeSetterProvider, useThemeSetterContext] =
  createSafeContext<IThemeSetterContextValue>(
    'You forgot to wrap your component in <ThemeSetterProvider />.',
  );
