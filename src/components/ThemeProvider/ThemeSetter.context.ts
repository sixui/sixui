import type { PartialDeep } from 'type-fest';

import { createSafeContext } from '~/helpers/createSafeContext';
import { ITheme2 } from './theme.types';

export type IThemeSetterContextValue = {
  setTheme: (theme: PartialDeep<ITheme2> | undefined) => void;
};

export const [ThemeSetterProvider, useThemeSetterContext] =
  createSafeContext<IThemeSetterContextValue>(
    'You forgot to wrap your component in <ThemeSetterProvider />.',
  );
