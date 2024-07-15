import { useRef } from 'react';
import stylex from '@stylexjs/stylex';
import { typescaleTokens } from '@/themes/base/tokens/typo.stylex';
import { FloatingDelayGroup } from '@floating-ui/react';

import { useThemeContext } from '@/components/utils/Theme';
import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { ColorSchemeContext, type IColorScheme } from './ColorSchemeContext';

export type IColorSchemeProviderProps = {
  scheme: IColorScheme;
  children: React.ReactNode;
};

const styles = stylex.create({
  host: {
    color: colorRolesTokens.onSurface,
    fontFamily: typescaleTokens.bodyFont$md,
    fontSize: typescaleTokens.bodySize$md,
    fontWeight: typescaleTokens.bodyWeight$md,
    lineHeight: typescaleTokens.bodyLineHeight$md,
    letterSpacing: typescaleTokens.bodyLetterSpacing$md,
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
              themeContext.theme.colorSchemes.dark,
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
