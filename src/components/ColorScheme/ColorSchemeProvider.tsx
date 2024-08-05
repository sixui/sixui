import { useRef } from 'react';
import stylex from '@stylexjs/stylex';
import { FloatingDelayGroup } from '@floating-ui/react';

import type { IStyleXStyles } from '~/helpers/types';
import { darkColorSchemeTheme } from '~/themes/base/darkColorScheme.styles';
import { themeProviderStyles, useThemeContext } from '~/components/Theme';
import { colorSchemeTheme } from '~/themes/base/colorScheme.stylex';
import {
  ColorSchemeContext,
  type IColorSchemeVariant,
} from './ColorScheme.context';
import { colorSchemeProviderStyles } from './ColorSchemeProvider.styles';
import { useColorScheme } from './useColorScheme';

export type IColorSchemeProviderProps = {
  variant: IColorSchemeVariant;
  children: React.ReactNode;
  sx?: IStyleXStyles;
};

export const ColorSchemeProvider: React.FC<IColorSchemeProviderProps> = (
  props,
) => {
  const { sx, variant, children } = props;

  const root = useRef<HTMLDivElement | null>(null);
  const themeContext = useThemeContext();
  const currentColorScheme = useColorScheme();

  const isDark = variant === 'dark';
  const isLight = !isDark;
  const shouldUpdatColorScheme = currentColorScheme.variant !== variant;

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
            isLight &&
              shouldUpdatColorScheme && [
                colorSchemeTheme,
                themeContext.theme?.schemes &&
                  themeProviderStyles.dynamicScheme(
                    themeContext.theme?.schemes.light,
                  ),
              ],
            isDark && colorSchemeProviderStyles.container$dark,
            isDark &&
              shouldUpdatColorScheme && [
                darkColorSchemeTheme,
                themeContext.theme?.schemes &&
                  themeProviderStyles.dynamicScheme(
                    themeContext.theme?.schemes.dark,
                  ),
              ],
            sx,
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
