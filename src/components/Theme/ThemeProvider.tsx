import { useMemo, useState } from 'react';
import stylex from '@stylexjs/stylex';

import type { IThemeProviderProps } from './ThemeProvider.types';
import { ThemeContext } from './ThemeContext';
import { themeProviderStyles } from './ThemeProvider.styles';
import {
  IThemeSetterContextValue,
  ThemeSetterContext,
} from './ThemeSetterContext';

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

  const themeSetterContextValue: IThemeSetterContextValue = useMemo(
    () => ({ setTheme }),
    [],
  );

  return (
    <ThemeSetterContext.Provider value={themeSetterContextValue}>
      <ThemeContext.Provider
        value={{
          theme: theme ?? themeProp,
          settings,
          componentsStyles,
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
    </ThemeSetterContext.Provider>
  );
};
