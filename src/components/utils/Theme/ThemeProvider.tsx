import stylex from '@stylexjs/stylex';

import type { IContainerProps } from '@/helpers/types';
import type { ITheme, IThemeSettings } from '@/themes/theme.types';
import { ThemeContext } from './ThemeContext';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';

export type IThemeProviderProps = IContainerProps & {
  children: React.ReactNode;
  theme: ITheme;
  settings?: IThemeSettings;
};

const styles = stylex.create({
  wrapper: {
    scrollbarWidth: 'thin',
    scrollbarColor: {
      '@media (pointer: fine)': `${colorRolesVars.primary} transparent`,
    },
  },
});

export const ThemeProvider: React.FC<IThemeProviderProps> = (props) => {
  const { sx, children, theme, settings, ...other } = props;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        settings: {
          linkAs: 'a',
          ...settings,
        },
      }}
    >
      <div {...stylex.props([styles.wrapper, sx])} {...other}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
