import type { IDynamicThemeProviderProps } from './DynamicThemeProvider.types';
import { generateThemeFromSourceColor } from '~/helpers/colors/generateThemeFromSourceColor';
import { IDynamicSchemeVariant } from '~/helpers/colors/getMaterialDynamicSchemeClass';
import { ThemeProvider } from './ThemeProvider';
import { useThemeContext } from './useThemeContext';

export const DynamicThemeProvider: React.FC<IDynamicThemeProviderProps> = (
  props,
) => {
  const {
    sourceColor,
    schemeVariant = IDynamicSchemeVariant.sixui,
    contrast = 0.0,
    settings,
    componentsStyles,
    ...other
  } = props;

  const themeContext = useThemeContext();
  const theme = generateThemeFromSourceColor(
    sourceColor,
    schemeVariant,
    contrast,
  );

  return (
    <ThemeProvider
      {...other}
      settings={settings ?? themeContext.settings}
      componentsStyles={componentsStyles ?? themeContext.componentsStyles}
      theme={theme}
    />
  );
};
