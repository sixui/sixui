import { useRef } from 'react';
import stylex from '@stylexjs/stylex';
import { typeScaleTokens } from '@/themes/base/typeScale.stylex';
import { FloatingDelayGroup } from '@floating-ui/react';

import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { darkColorSchemeTheme } from '@/themes/base/darkColorScheme.styles';
import { themeProviderStyles, useThemeContext } from '@/components/Theme';
import {
  ColorSchemeContext,
  type IColorSchemeVariant,
} from './ColorSchemeContext';

export type IColorSchemeProviderProps = {
  scheme: IColorSchemeVariant;
  children: React.ReactNode;
};

const styles = stylex.create({
  host: {
    color: colorSchemeTokens.onSurface,
    fontFamily: typeScaleTokens.bodyFont$md,
    fontSize: typeScaleTokens.bodySize$md,
    fontWeight: typeScaleTokens.bodyWeight$md,
    lineHeight: typeScaleTokens.bodyLineHeight$md,
    letterSpacing: typeScaleTokens.bodyLetterSpacing$md,
  },
  container$light: {
    colorScheme: 'light',
  },
  container$dark: {
    colorScheme: 'dark',
  },
});

export const ColorSchemeProvider: React.FC<IColorSchemeProviderProps> = (
  props,
) => {
  const { scheme, children } = props;

  const root = useRef<HTMLDivElement | null>(null);
  const themeContext = useThemeContext();

  const isDark = scheme === 'dark';
  const isLight = !isDark;

  return (
    <ColorSchemeContext.Provider value={{ scheme, root }}>
      <FloatingDelayGroup
        delay={{
          open: 100,
          close: 1500,
        }}
      >
        <div
          {...stylex.props(
            styles.host,
            isLight && styles.container$light,
            isDark && [
              styles.container$dark,
              darkColorSchemeTheme,
              themeContext.theme?.schemes &&
                themeProviderStyles.dynamicScheme(
                  themeContext.theme?.schemes.dark,
                ),
            ],
          )}
          ref={root}
          data-scheme={scheme}
        >
          {children}
        </div>
      </FloatingDelayGroup>
    </ColorSchemeContext.Provider>
  );
};
