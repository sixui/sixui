import { useMemo, useRef, useState } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { FloatingDelayGroup } from '@floating-ui/react';
import cx from 'clsx';

import type {
  IThemeOverride,
  IThemeProviderProps,
} from './ThemeProvider.types';
import { deepMerge } from '~/helpers/deepMerge';
import { Box } from '../Box';
import { ThemeContext, type IThemeContextValue } from './Theme.context';
import {
  ThemeSetterContext,
  type IThemeSetterContextValue,
} from './ThemeSetter.context';
import * as styles from './ThemeProvider.css';
import { defaultTheme } from './defaultTheme';
// import { ResponsiveStyles } from './ResponsiveStyles';

export const ThemeProvider: React.FC<IThemeProviderProps> = (props) => {
  const {
    className,
    style,
    children,
    theme,
    settings,
    colorSchemeVariant = 'light',
    ...other
  } = props;
  const [dynamicTheme, setDynamicTheme] = useState<
    IThemeOverride | undefined
  >();
  const mergedTheme = useMemo(
    () => deepMerge(defaultTheme, theme, dynamicTheme),
    [theme, dynamicTheme],
  );

  const root = useRef<HTMLDivElement | null>(null);
  const themeContextValue: IThemeContextValue = useMemo(
    () => ({
      root,
      theme: mergedTheme,
      settings,
    }),
    [mergedTheme, settings],
  );

  const themeSetterContextValue: IThemeSetterContextValue = useMemo(
    () => ({ setTheme: setDynamicTheme }),
    [],
  );

  const isDark = colorSchemeVariant === 'dark';

  return (
    <ThemeSetterContext.Provider value={themeSetterContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <Box
          {...other}
          className={cx('sixui-root', styles.styles.root, className)}
          style={{
            ...style,
            ...assignInlineVars(styles.themeTokens, {
              ...mergedTheme.tokens,
              colorScheme: isDark
                ? mergedTheme.tokens.colorScheme.dark
                : mergedTheme.tokens.colorScheme.light,
            }),
          }}
        >
          <FloatingDelayGroup
            delay={{
              open: 100,
              close: 1500,
            }}
          >
            {/* <ResponsiveStyles /> */}
            {children}
          </FloatingDelayGroup>
        </Box>
      </ThemeContext.Provider>
    </ThemeSetterContext.Provider>
  );
};
