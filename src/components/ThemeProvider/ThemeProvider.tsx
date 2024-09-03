import { FloatingDelayGroup } from '@floating-ui/react';
import { useContext, useMemo, useRef, useState } from 'react';
import cx from 'clsx';

import type { IThemeProviderProps } from './ThemeProvider.types';
import { deepMerge } from '~/helpers/deepMerge';
import { partialAssignInlineVars } from '~/utils/styles/partialAssignInlineVars';
import { ThemeContext, type IThemeContextValue } from './ThemeProvider.context';
import type { IThemeOverride } from './theme.types';
import {
  ThemeSetterContext,
  type IThemeSetterContextValue,
} from './ThemeSetter.context';
import { defaultTheme } from './defaultTheme';
import { mergeTheme } from './mergeTheme';
import * as styles from './ThemeProvider.css';

export const ThemeProvider: React.FC<IThemeProviderProps> = (props) => {
  const {
    className,
    style,
    children,
    theme,
    colorSchemeVariant = 'light',
    inherit = true,
    ...other
  } = props;

  const themeContext = useContext(ThemeContext);
  const parentTheme = themeContext?.theme;

  const [dynamicTheme, setDynamicTheme] = useState<
    IThemeOverride | undefined
  >();
  const mergedTheme = useMemo(
    () =>
      mergeTheme(
        mergeTheme((inherit ? parentTheme : undefined) ?? defaultTheme, theme),
        dynamicTheme,
      ),
    [inherit, parentTheme, theme, dynamicTheme],
  );

  const root = useRef<HTMLDivElement | null>(null);
  const themeContextValue: IThemeContextValue = useMemo(
    () => ({
      root,
      theme: mergedTheme,
    }),
    [mergedTheme],
  );

  const themeSetterContextValue: IThemeSetterContextValue = useMemo(
    () => ({ setTheme: setDynamicTheme }),
    [],
  );

  const themeOverrideVars = useMemo(() => {
    const tokensOverride = deepMerge(theme?.tokens ?? {}, dynamicTheme?.tokens);
    const themeTokensOverride = {
      ...tokensOverride,
      colorScheme:
        colorSchemeVariant === 'dark'
          ? deepMerge(
              mergedTheme.tokens.colorScheme.dark,
              tokensOverride.colorScheme?.dark,
            )
          : tokensOverride.colorScheme?.light,
    };

    return themeTokensOverride;
  }, [
    theme?.tokens,
    dynamicTheme?.tokens,
    mergedTheme.tokens,
    colorSchemeVariant,
  ]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <ThemeSetterContext.Provider value={themeSetterContextValue}>
        <div
          {...other}
          className={cx(
            styles.styles.root,
            parentTheme ? undefined : styles.themeTokensClassName,
            className,
          )}
          style={{
            ...style,
            ...partialAssignInlineVars(styles.themeTokens, themeOverrideVars),
          }}
        >
          <FloatingDelayGroup
            delay={{
              open: 100,
              close: 1500,
            }}
          >
            {children}
          </FloatingDelayGroup>
        </div>
      </ThemeSetterContext.Provider>
    </ThemeContext.Provider>
  );
};