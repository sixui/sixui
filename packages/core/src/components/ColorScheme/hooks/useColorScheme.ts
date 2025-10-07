import type {
  IColorScheme,
  IStrictColorScheme,
} from '~/components/Theme/theme.types';
import { useThemeContext } from '~/components/Theme/Theme.context';
import { useThemeSetterContext } from '~/components/Theme/ThemeSetter.context';

export type IUseColorSchemeResult = {
  colorScheme: IStrictColorScheme;
  setColorScheme: (variant: IColorScheme) => void;
  toggleColorScheme: () => void;
};

export const useColorScheme = (): IUseColorSchemeResult => {
  const themeContext = useThemeContext();
  const themeSetterContext = useThemeSetterContext();

  return {
    colorScheme: themeContext.colorScheme,
    setColorScheme: themeSetterContext.setColorScheme,
    toggleColorScheme: themeSetterContext.toggleColorScheme,
  };
};
