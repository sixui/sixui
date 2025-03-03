import { useContext, useMemo, useRef, useState } from 'react';
import { FloatingDelayGroup } from '@floating-ui/react';

import type { IThemeContextValue } from './Theme.context';
import type { IThemeOverride } from './theme.types';
import type { IThemeProviderProps } from './ThemeProvider.types';
import type { IThemeSetterContextValue } from './ThemeSetter.context';
import { InlineStyles } from '~/components/InlineStyles';
import { OverlaysProvider } from '~/components/Overlays';
import { useClassName } from '~/hooks/useClassName';
import { partialAssignInlineVars } from '~/utils/css/partialAssignInlineVars';
import { deepMerge } from '~/utils/deepMerge';
import { ThemeContext } from './Theme.context';
import { COMPONENT_NAME } from './ThemeProvider.constants';
import { ThemeSetterProvider } from './ThemeSetter.context';
import { mergeThemeOverrides } from './utils/mergeThemeOverrides';
import {
  classNames,
  cssLayers,
  defaultTheme,
  themeTokens,
} from './ThemeProvider.css';

/**
 * @see https://m3.material.io/styles/color/system/how-the-system-works
 */
export const ThemeProvider: React.FC<IThemeProviderProps> = (props) => {
  const {
    children,
    theme: themeOverrides,
    colorSchemeVariant: colorSchemeVariantProp,
    inherit,
    cssVariablesSelector: cssVariableSelectorProp,
    getRootElement = () => document.documentElement,
    ...other
  } = props;

  const inheritedThemeContext = useContext(ThemeContext);
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
        (inherit ? inheritedThemeContext?.theme : undefined) ?? defaultTheme,
        themeOverrides,
        dynamicTheme,
      ),
    [inherit, inheritedThemeContext?.theme, themeOverrides, dynamicTheme],
  );

  const colorSchemeVariant =
    colorSchemeVariantProp ??
    inheritedThemeContext?.colorSchemeVariant ??
    'light';

  const rootRef = useRef<HTMLDivElement | null>(null);
  const themeContextValue: IThemeContextValue = useMemo(
    () => ({
      getRoot: () => rootRef.current,
      theme: mergedTheme,
      colorSchemeVariant,
      getRootElement,
    }),
    [mergedTheme, colorSchemeVariant, getRootElement],
  );

  const themeSetterContextValue: IThemeSetterContextValue = useMemo(
    () => ({ setTheme: setDynamicTheme }),
    [],
  );

  const themeTokensVars = useMemo(
    () => ({
      ...(inherit
        ? mergedTheme.tokens
        : deepMerge(defaultTheme.tokens, mergedTheme.tokens)),
      colorScheme: mergedTheme.tokens.colorScheme[colorSchemeVariant],
    }),
    [inherit, mergedTheme, colorSchemeVariant],
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <ThemeSetterProvider value={themeSetterContextValue}>
        <FloatingDelayGroup
          delay={{
            open: 100,
            close: 1500,
          }}
        >
          <div
            id={randomClassName}
            className={classNames.root}
            ref={rootRef}
            {...other}
          >
            <InlineStyles
              layer={cssLayers.theme}
              selector={cssVariablesSelector}
              styles={{
                ...partialAssignInlineVars(themeTokens, themeTokensVars),
                color: themeTokens.colorScheme.onSurface,
              }}
              mediaQueries={[
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
