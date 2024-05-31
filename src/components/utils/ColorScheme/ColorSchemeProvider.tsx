import { useRef } from 'react';
import stylex from '@stylexjs/stylex';
import { typescaleVars } from '@/themes/base/vars/typo.stylex';

import { ColorSchemeContext, type IColorScheme } from './ColorSchemeContext';
import { useThemeContext } from '@/components/utils/Theme';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';

export type IColorSchemeProviderProps = {
  scheme: IColorScheme;
  children: React.ReactNode;
};

const styles = stylex.create({
  host: {
    color: colorRolesVars.onSurface,
    fontFamily: typescaleVars.bodyFont$md,
    fontSize: typescaleVars.bodySize$md,
    fontWeight: typescaleVars.bodyWeight$md,
    lineHeight: typescaleVars.bodyLineHeight$md,
    letterSpacing: typescaleVars.bodyLetterSpacing$md,
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
    </ColorSchemeContext.Provider>
  );
};
