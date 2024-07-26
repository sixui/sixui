import { useState } from 'react';
import stylex from '@stylexjs/stylex';

import type { IThemeProviderProps } from './ThemeProvider.types';
import { ThemeContext } from './ThemeContext';
import { themeProviderStyles } from './ThemeProvider.styles';

export const ThemeProvider: React.FC<IThemeProviderProps> = (props) => {
  const {
    sx,
    children,
    theme: themeProp,
    settings,
    componentsStyles,
    ...other
  } = props;
  const [theme, setTheme] = useState(themeProp);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        settings,
        componentsStyles,
        setTheme: (newTheme) => setTheme(newTheme ?? themeProp),
      }}
    >
      <div
        {...stylex.props([
          theme?.schemes &&
            themeProviderStyles.dynamicScheme(theme.schemes.light),
          theme?.shape && themeProviderStyles.dynamicShape(theme.shape),
          theme?.motion && themeProviderStyles.dynamicMotion(theme.motion),
          theme?.typeFace &&
            themeProviderStyles.dynamicTypeFace(theme.typeFace),
          theme?.typeScale &&
            themeProviderStyles.dynamicTypeScale(theme.typeScale),
          themeProviderStyles.wrapper,
          sx,
        ])}
        {...other}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
