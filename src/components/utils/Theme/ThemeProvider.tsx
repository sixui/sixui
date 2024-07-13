import stylex, { type Theme, type VarGroup } from '@stylexjs/stylex';

import type { IContainerProps, IMakeOptional } from '@/helpers/types';
import type { IColorPalettesThemeVars } from '@/themes';
import type { IShapeThemeVars } from '@/themes/shape.types';
import type { IMotionThemeVars } from '@/themes/motion.types';
import type {
  ITypefaceThemeVars,
  ITypescaleThemeVars,
} from '@/themes/typo.types';
import {
  colorRolesVars,
  colorRolesTheme,
} from '@/themes/base/vars/colorRoles.stylex';
import { ThemeContext, type IThemeContextValue } from './ThemeContext';

export type IThemeProviderProps = IContainerProps &
  IMakeOptional<IThemeContextValue, 'settings'> & {
    children: React.ReactNode;
    colorPalettesTheme?: Theme<VarGroup<IColorPalettesThemeVars>>;
    shapeTheme?: Theme<VarGroup<IShapeThemeVars>>;
    motionTheme?: Theme<VarGroup<IMotionThemeVars>>;
    typefaceTheme?: Theme<VarGroup<ITypefaceThemeVars>>;
    typescaleTheme?: Theme<VarGroup<ITypescaleThemeVars>>;
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
  const {
    sx,
    children,
    theme,
    settings,
    colorPalettesTheme,
    shapeTheme,
    motionTheme,
    typefaceTheme,
    typescaleTheme,
    componentsStyles,
    ...other
  } = props;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        settings: {
          linkAs: 'a',
          ...settings,
        },
        componentsStyles,
      }}
    >
      <div
        {...stylex.props([
          colorPalettesTheme
            ? [colorPalettesTheme, colorRolesTheme]
            : undefined,
          shapeTheme,
          motionTheme,
          typefaceTheme,
          typescaleTheme,
          styles.wrapper,
          sx,
        ])}
        {...other}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
