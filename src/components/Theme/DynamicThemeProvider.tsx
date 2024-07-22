import type { IDynamicThemeProviderProps } from './DynamicThemeProvider.types';
import { generateThemeFromSourceColor } from '@/helpers/colors/generateThemeFromSourceColor';
import { IDynamicSchemeVariant } from '@/helpers/colors/getMaterialDynamicSchemeClass';
import { ThemeProvider } from './ThemeProvider';

export const DynamicThemeProvider: React.FC<IDynamicThemeProviderProps> = (
  props,
) => {
  const {
    sourceColor,
    schemeVariant = IDynamicSchemeVariant.sixui,
    contrast = 0.0,
    ...other
  } = props;

  const theme = generateThemeFromSourceColor(
    sourceColor,
    schemeVariant,
    contrast,
  );

  return <ThemeProvider {...other} theme={theme} />;
};
