import stylex from '@stylexjs/stylex';

import {
  ColorSchemeContext,
  type IColorSchemeContext,
} from './ColorSchemeContext';
import { useTheme } from '@/components/utils/Theme';

export type IColorSchemeProviderProps = {
  children: React.ReactNode;
  value: IColorSchemeContext;
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
  const { children, value } = props;

  const theme = useTheme();

  return (
    <ColorSchemeContext.Provider value={value}>
      {value.colorScheme === 'dark' ? (
        <div {...stylex.props(styles.container$dark, theme.colorSchemes.dark)}>
          {children}
        </div>
      ) : (
        <div {...stylex.props(styles.container$light)}>{children}</div>
      )}
    </ColorSchemeContext.Provider>
  );
};
