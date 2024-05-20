import stylex from '@stylexjs/stylex';

import type { IContainerProps } from '@/helpers/types';
import { ThemeContext, type IThemeContext } from './ThemeContext';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';

export type IThemeProviderProps = IContainerProps & {
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

export const ThemeProvider: React.FC<IThemeProviderProps> = (props) => {
  const { sx, children, value, ...other } = props;

  return (
    <ThemeContext.Provider value={value}>
      <div {...stylex.props([styles.wrapper, sx])} {...other}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
