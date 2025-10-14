import { useContext, useMemo, useRef, useState } from 'react';
import { FloatingDelayGroup } from '@floating-ui/react';

import type { IThemeContextValue } from './Theme.context';
import type { IThemeOverride } from './theme.types';
import type { IThemeProviderProps } from './ThemeProvider.types';
import type { IThemeSetterContextValue } from './ThemeSetter.context';
import { localStorageColorSchemeManager } from '~/components/ColorScheme';
import { InlineStyles } from '~/components/InlineStyles';
import { OverlaysProvider } from '~/components/Overlays';
import { useClassName } from '~/hooks/useClassName';
import { partialAssignInlineVars } from '~/utils/css/partialAssignInlineVars';
import { deepMerge } from '~/utils/deepMerge';
import { cssLayers } from '~/components/Theme/cssLayers.css';
import { useThemeProviderColorScheme } from './hooks/useThemeProviderColorScheme';
import { ThemeContext } from './Theme.context';
import { COMPONENT_NAME } from './ThemeProvider.constants';
import { ThemeSetterProvider } from './ThemeSetter.context';
import { mergeThemeOverrides } from './utils/mergeThemeOverrides';
import { defaultTheme, themeTokens } from './theme.css';
import { classNames } from './ThemeProvider.css';

/**
 * @see https://m3.material.io/styles/color/system/how-the-system-works
 */
export const ThemeProvider: React.FC<IThemeProviderProps> = (props) => {
  const {
    children,
    theme: themeOverrides,
    inherit,
    cssVariablesSelector: cssVariableSelectorProp,
    getRootElement = () => document.documentElement,
    colorSchemeManager = localStorageColorSchemeManager(),
    defaultColorScheme = 'light',
    enableColorSchemePersistence: _enableColorSchemePersistence = false,
    forceColorScheme,
    ...other
  } = props;

  const parentThemeContext = useContext(ThemeContext);
  const { colorScheme, setColorScheme, toggleColorScheme, clearColorScheme } =
    useThemeProviderColorScheme({
      defaultColorScheme,
      parentThemeColorScheme: parentThemeContext?.colorScheme,
      forceColorScheme,
      manager: colorSchemeManager,
      getRootElement,
    });

  const randomClassName = useClassName({
    prefix: COMPONENT_NAME,
  });
  const cssVariablesSelector = cssVariableSelectorProp ?? `#${randomClassName}`;

  const [dynamicTheme, setDynamicTheme] = useState<
    IThemeOverride | undefined
  >();

  const mergedTheme = useMemo(
    () =>
      mergeThemeOverrides(
        (inherit ? parentThemeContext?.theme : undefined) ?? defaultTheme,
        themeOverrides,
        dynamicTheme,
      ),
    [inherit, parentThemeContext?.theme, themeOverrides, dynamicTheme],
  );

  const rootRef = useRef<HTMLDivElement | null>(null);
  const themeContextValue: IThemeContextValue = useMemo(
    () => ({
      getRoot: () => rootRef.current,
      theme: mergedTheme,
      colorScheme,
      getRootElement,
    }),
    [mergedTheme, colorScheme, getRootElement],
  );

  const themeSetterContextValue: IThemeSetterContextValue = useMemo(
    () => ({
      setTheme: setDynamicTheme,
      setColorScheme,
      toggleColorScheme,
      clearColorScheme,
    }),
    [setColorScheme, toggleColorScheme, clearColorScheme],
  );

  // Generate CSS variables for ALL color schemes to prevent hydration mismatch
  const baseThemeTokensVars = useMemo(
    () =>
      inherit
        ? mergedTheme.tokens
        : deepMerge(defaultTheme.tokens, mergedTheme.tokens),
    [inherit, mergedTheme],
  );

  const lightThemeTokensVars = useMemo(
    () => ({
      ...baseThemeTokensVars,
      colorScheme: mergedTheme.tokens.colorScheme.light,
    }),
    [baseThemeTokensVars, mergedTheme.tokens.colorScheme.light],
  );

  const darkThemeTokensVars = useMemo(
    () => ({
      ...baseThemeTokensVars,
      colorScheme: mergedTheme.tokens.colorScheme.dark,
    }),
    [baseThemeTokensVars, mergedTheme.tokens.colorScheme.dark],
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <ThemeSetterProvider value={themeSetterContextValue}>
        <FloatingDelayGroup
          delay={{
            close: 600,
          }}
        >
          <div
            id={randomClassName}
            className={classNames.root}
            ref={rootRef}
            data-sixui-color-scheme={
              parentThemeContext ? colorScheme : undefined
            }
            {...other}
          >
            <InlineStyles
              layer={cssLayers.theme}
              selector={cssVariablesSelector}
              styles={partialAssignInlineVars(themeTokens, baseThemeTokensVars)}
              additionalSelectors={[
                {
                  selector: `${cssVariablesSelector}[data-sixui-color-scheme="light"]`,
                  styles: {
                    ...partialAssignInlineVars(
                      themeTokens.colorScheme,
                      lightThemeTokensVars.colorScheme,
                    ),
                    color: themeTokens.colorScheme.onSurface,
                  },
                },
                {
                  selector: `${cssVariablesSelector}[data-sixui-color-scheme="dark"]`,
                  styles: {
                    ...partialAssignInlineVars(
                      themeTokens.colorScheme,
                      darkThemeTokensVars.colorScheme,
                    ),
                    color: themeTokens.colorScheme.onSurface,
                  },
                },
              ]}
              queries={[
                {
                  query: '(pointer: fine)',
                  styles: {
                    scrollbarColor: `${themeTokens.colorScheme.primary} transparent`,
                  },
                },
              ]}
            />

            <OverlaysProvider>{children}</OverlaysProvider>
          </div>
        </FloatingDelayGroup>
      </ThemeSetterProvider>
    </ThemeContext.Provider>
  );
};

ThemeProvider.displayName = COMPONENT_NAME;
