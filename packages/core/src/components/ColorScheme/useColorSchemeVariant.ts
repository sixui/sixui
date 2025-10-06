import type {
  IOsColorScheme,
  IThemeColorSchemeVariant,
} from '~/components/Theme/theme.types';
import { useThemeContext } from '~/components/Theme/Theme.context';
import { useThemeSetterContext } from '~/components/Theme/ThemeSetter.context';

export type IUseColorSchemeVariantResult = {
  colorSchemeVariant: IThemeColorSchemeVariant;
  setColorScheme: (variant: IOsColorScheme) => void;
  toggleColorScheme: () => void;
};

export const useColorSchemeVariant = (): IUseColorSchemeVariantResult => {
  const themeContext = useThemeContext();
  const themeSetterContext = useThemeSetterContext();

  return {
    colorSchemeVariant: themeContext.colorSchemeVariant,
    setColorScheme: themeSetterContext.setColorSchemeVariant,
    toggleColorScheme: themeSetterContext.toggleColorScheme,
  };
};
