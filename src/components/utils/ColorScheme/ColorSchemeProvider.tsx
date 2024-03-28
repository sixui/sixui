import { useRef } from 'react';
import stylex from '@stylexjs/stylex';

import { ColorSchemeContext, type IColorScheme } from './ColorSchemeContext';
import { useTheme } from '@/components/utils/Theme';

export type IColorSchemeProviderProps = {
  scheme: IColorScheme;
  children: React.ReactNode;
};

const styles = stylex.create({
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
  const theme = useTheme();

  const isDark = scheme === 'dark';
  const isLight = !isDark;

  return (
    <ColorSchemeContext.Provider value={{ scheme, root }}>
      <div
        {...stylex.props(
          isLight && styles.container$light,
          isDark && [styles.container$dark, theme.colorSchemes.dark],
        )}
        ref={root}
        data-scheme={scheme}
      >
        {children}
      </div>
    </ColorSchemeContext.Provider>
  );
};
