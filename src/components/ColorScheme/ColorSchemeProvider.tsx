import { useRef } from 'react';
import stylex from '@stylexjs/stylex';
import { FloatingDelayGroup } from '@floating-ui/react';

import { darkColorSchemeTheme } from '@/themes/base/darkColorScheme.styles';
import { themeProviderStyles, useThemeContext } from '@/components/Theme';
import {
  ColorSchemeContext,
  type IColorSchemeVariant,
} from './ColorSchemeContext';
import { colorSchemeProviderStyles } from './ColorSchemeProvider.styles';

export type IColorSchemeProviderProps = {
  variant: IColorSchemeVariant;
  children: React.ReactNode;
};

export const ColorSchemeProvider: React.FC<IColorSchemeProviderProps> = (
  props,
) => {
  const { variant, children } = props;

  const root = useRef<HTMLDivElement | null>(null);
  const themeContext = useThemeContext();

  const isDark = variant === 'dark';
  const isLight = !isDark;

  return (
    <ColorSchemeContext.Provider value={{ variant, root }}>
      <FloatingDelayGroup
        delay={{
          open: 100,
          close: 1500,
        }}
      >
        <div
          {...stylex.props(
            colorSchemeProviderStyles.host,
            isLight && colorSchemeProviderStyles.container$light,
            isDark && [
              colorSchemeProviderStyles.container$dark,
              darkColorSchemeTheme,
              themeContext.theme?.schemes &&
                themeProviderStyles.dynamicScheme(
                  themeContext.theme?.schemes.dark,
                ),
            ],
          )}
          ref={root}
          data-scheme={variant}
        >
          {children}
        </div>
      </FloatingDelayGroup>
    </ColorSchemeContext.Provider>
  );
};
