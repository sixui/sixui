import type { IThemeSettings } from '@/themes/theme.types';
import type { StyleXStyles } from '@stylexjs/stylex';
import {
  useThemeContext,
  type IThemeComponents,
} from '@/components/utils/Theme';

export type IUseComponentThemeResult<
  TThemeComponent extends keyof IThemeComponents,
  TVariantThemeComponent extends keyof IThemeComponents = never,
> = {
  theme: IThemeComponents[TThemeComponent];
  variantTheme?: IThemeComponents[TVariantThemeComponent];
  settings: IThemeSettings;
  overridenStyles?: StyleXStyles;
};

/**
 * @deprecated - use useComponentTheme()
 */
export const useComponentThemeOld = <
  TThemeComponent extends keyof IThemeComponents,
  TVariantThemeComponent extends keyof IThemeComponents = never,
>(
  component: TThemeComponent,
  variantComponent?: TVariantThemeComponent,
): IUseComponentThemeResult<TThemeComponent, TVariantThemeComponent> => {
  const themeContext = useThemeContext();

  return {
    theme: themeContext.theme.components[component],
    variantTheme: variantComponent
      ? themeContext.theme.components[variantComponent]
      : undefined,
    settings: themeContext.settings,
    overridenStyles: themeContext.componentsStyles?.[component],
  };
};
