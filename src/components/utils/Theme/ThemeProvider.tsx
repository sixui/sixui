import stylex from '@stylexjs/stylex';

import { type IThemeContext, ThemeContext } from './ThemeContext';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';

export type IThemeProviderProps = {
  children: React.ReactNode;
  value: IThemeContext;
};

const styles = stylex.create({
  wrapper: {
    scrollbarWidth: 'thin',
    scrollbarColor: {
      '@media (pointer: fine)': `${colorRolesVars.primary} transparent`,
    },
  },
});

export const ThemeProvider: React.FC<IThemeProviderProps> = ({
  children,
  value,
}) => (
  <ThemeContext.Provider value={value}>
    <div {...stylex.props(styles.wrapper)}>{children}</div>
  </ThemeContext.Provider>
);
