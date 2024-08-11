import { useMemo, useState } from 'react';
import stylex from '@stylexjs/stylex';

import type { IThemeProviderProps } from './ThemeProvider.types';
import { ThemeContext } from './Theme.context';
import type { ITheme } from '~/themes/base';
import { themeProviderStyles } from './ThemeProvider.styles';
import {
  IThemeSetterContextValue,
  ThemeSetterContext,
} from './ThemeSetter.context';

export const ThemeProvider: React.FC<IThemeProviderProps> = (props) => {
  const {
    sx,
    children,
    theme: defaultTheme,
    settings,
    componentsStyles,
    ...other
  } = props;
  const [dynamicTheme, setDynamicTheme] = useState(defaultTheme);
  const theme = {
    ...defaultTheme,
    ...dynamicTheme,
  } as ITheme | undefined;

  const themeSetterContextValue: IThemeSetterContextValue = useMemo(
    () => ({ setTheme: setDynamicTheme }),
    [],
  );

  return (
    <ThemeSetterContext.Provider value={themeSetterContextValue}>
      <ThemeContext.Provider
        value={{
          theme,
          settings,
          componentsStyles,
        }}
      >
        <div
          {...other}
          {...stylex.props([
            theme?.scale && themeProviderStyles.dynamicScale(theme.scale),
            theme?.density && themeProviderStyles.dynamicDensity(theme.density),
            theme?.schemes &&
              themeProviderStyles.dynamicScheme(theme.schemes.light),
            theme?.shape && themeProviderStyles.dynamicShape(theme.shape),
            theme?.motion && themeProviderStyles.dynamicMotion(theme.motion),
            theme?.typeFace &&
              themeProviderStyles.dynamicTypeFace(theme.typeFace),
            theme?.typeScale &&
              themeProviderStyles.dynamicTypeScale(theme.typeScale),
            theme?.state && themeProviderStyles.dynamicState(theme.state),
            theme?.zIndex && themeProviderStyles.dynamicZIndex(theme.zIndex),
            theme?.outline && themeProviderStyles.dynamicOutline(theme.outline),
            themeProviderStyles.wrapper,
            sx,
          ])}
        >
          {children}
        </div>
      </ThemeContext.Provider>
    </ThemeSetterContext.Provider>
  );
};
