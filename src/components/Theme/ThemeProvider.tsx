import stylex, { type Theme, type VarGroup } from '@stylexjs/stylex';

import type { IContainerProps, IMakeOptional } from '@/helpers/types';
import type { ITonalPalettesThemeVars } from '@/themes/base/tonalPalettes.types';
import type { IShapeThemeVars } from '@/themes/base/shape.types';
import type { IMotionThemeVars } from '@/themes/base/motion.types';
import type {
  ITypefaceThemeVars,
  ITypescaleThemeVars,
} from '@/themes/base/typo.types';
import {
  colorRolesTokens,
  colorRolesTheme,
} from '@/themes/base/colorRoles.stylex';
import { ThemeContext, type IThemeContextValue } from './ThemeContext';

export type IThemeProviderProps = IContainerProps &
  IMakeOptional<IThemeContextValue, 'settings'> & {
    children: React.ReactNode;
    tonalPalettesTheme?: Theme<VarGroup<ITonalPalettesThemeVars>>;
    shapeTheme?: Theme<VarGroup<IShapeThemeVars>>;
    motionTheme?: Theme<VarGroup<IMotionThemeVars>>;
    typefaceTheme?: Theme<VarGroup<ITypefaceThemeVars>>;
    typescaleTheme?: Theme<VarGroup<ITypescaleThemeVars>>;
  };

const styles = stylex.create({
  wrapper: {
    scrollbarWidth: 'thin',
    scrollbarColor: {
      '@media (pointer: fine)': `${colorRolesTokens.primary} transparent`,
    },
  },
});

export const ThemeProvider: React.FC<IThemeProviderProps> = (props) => {
  const {
    sx,
    children,
    settings,
    tonalPalettesTheme,
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
        settings: {
          linkAs: 'a',
          ...settings,
        },
        componentsStyles,
      }}
    >
      <div
        {...stylex.props([
          tonalPalettesTheme
            ? [tonalPalettesTheme, colorRolesTheme]
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
