import type {
  IOsColorScheme,
  IThemeColorSchemeVariant,
} from '~/components/Theme/theme.types';
import { useThemeContext } from '~/components/Theme/Theme.context';
import { useThemeSetterContext } from '~/components/Theme/ThemeSetter.context';

export type IUseColorSchemeResult = {
  colorScheme: IThemeColorSchemeVariant;
  setColorScheme: (variant: IOsColorScheme) => void;
  toggleColorScheme: () => void;
};

export const useColorScheme = (): IUseColorSchemeResult => {
  const themeContext = useThemeContext();
  const themeSetterContext = useThemeSetterContext();

  return {
    colorScheme: themeContext.colorSchemeVariant,
    setColorScheme: themeSetterContext.setColorSchemeVariant,
    toggleColorScheme: themeSetterContext.toggleColorScheme,
  };
};
