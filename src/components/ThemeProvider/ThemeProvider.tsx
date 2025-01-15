import { useContext, useMemo, useRef, useState } from 'react';
import { FloatingDelayGroup } from '@floating-ui/react';
import cx from 'clsx';

import type { IThemeOverride } from './theme.types';
import type { IThemeContextValue } from './ThemeProvider.context';
import type { IThemeProviderProps } from './ThemeProvider.types';
import type { IThemeSetterContextValue } from './ThemeSetter.context';
import { deepMerge } from '~/helpers/deepMerge';
import { partialAssignInlineVars } from '~/utils/styles/partialAssignInlineVars';
import { defaultTheme } from './defaultTheme';
import { mergeTheme } from './mergeTheme';
import { ThemeContext } from './ThemeProvider.context';
import { ThemeSetterContext } from './ThemeSetter.context';
import * as styles from './ThemeProvider.css';

export const ThemeProvider: React.FC<IThemeProviderProps> = (props) => {
  const {
    className,
    style,
    children,
    theme,
    colorSchemeVariant: colorSchemeVariantProp,
    inherit = true,
    ...other
  } = props;

  const themeContext = useContext(ThemeContext);

  const parentTheme = themeContext?.theme;
  const colorSchemeVariant =
    colorSchemeVariantProp ?? themeContext?.colorSchemeVariant ?? 'light';

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

  const rootRef = useRef<HTMLDivElement | null>(null);
  const themeContextValue: IThemeContextValue = useMemo(
    () => ({
      getRoot: () => rootRef.current,
      theme: mergedTheme,
      colorSchemeVariant,
    }),
    [mergedTheme, colorSchemeVariant],
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
          className={cx(
            styles.styles.root,
            parentTheme ? undefined : styles.themeTokensClassName,
            className,
          )}
          style={{
            ...style,
            ...partialAssignInlineVars(styles.themeTokens, themeOverrideVars),
          }}
          ref={rootRef}
          {...other}
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
