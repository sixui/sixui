import { useContext, useMemo, useRef, useState } from 'react';
import { FloatingDelayGroup } from '@floating-ui/react';

import type { IThemeContextValue } from './Theme.context';
import type { IThemeOverride } from './theme.types';
import type { IThemeProviderProps } from './ThemeProvider.types';
import type { IThemeSetterContextValue } from './ThemeSetter.context';
import { OverlaysProvider } from '~/components/Overlays';
import { useId } from '~/hooks/useId';
import { partialAssignInlineVars } from '~/utils/css/partialAssignInlineVars';
import { textFromCssProperties } from '~/utils/css/textFromCssProperties';
import { deepMerge } from '~/utils/deepMerge';
import { ThemeContext } from './Theme.context';
import { COMPONENT_NAME } from './ThemeProvider.constants';
import { ThemeSetterProvider } from './ThemeSetter.context';
import { mergeThemeOverrides } from './utils/mergeThemeOverrides';
import { cssLayers, defaultTheme, themeTokens } from './ThemeProvider.css';

/**
 * @see https://m3.material.io/styles/color/system/how-the-system-works
 */
export const ThemeProvider: React.FC<IThemeProviderProps> = (props) => {
  const {
    className,
    style,
    children,
    theme: themeOverrides,
    colorSchemeVariant: colorSchemeVariantProp,
    inherit,
    cssVariablesSelector: cssVariableSelectorProp,
    getRootElement = () => document.documentElement,
    ...other
  } = props;

  const inheritedThemeContext = useContext(ThemeContext);
  const id = useId();
  const cssId = `sixui_themeProvider_${id.replace(/:/g, '')}`;
  const cssVariablesSelector = cssVariableSelectorProp ?? `#${cssId}`;

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

  const css = `
@layer ${cssLayers.theme} {
  ${cssVariablesSelector} {
    ${textFromCssProperties(
      partialAssignInlineVars(themeTokens, themeTokensVars),
      {
        indent: 4,
        initialIndent: false,
      },
    )}
    color: ${themeTokens.colorScheme.onSurface};
  }

  @media (pointer: fine) {
    ${cssVariablesSelector} {
      scrollbar-color: ${themeTokens.colorScheme.primary} transparent;
    }
  }
}
  `;

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
            id={cssId}
            className={className}
            style={style}
            ref={rootRef}
            {...other}
          >
            <style
              type="text/css"
              data-sixui-styles={COMPONENT_NAME}
              dangerouslySetInnerHTML={{ __html: css }}
            />

            <OverlaysProvider>{children}</OverlaysProvider>
          </div>
        </FloatingDelayGroup>
      </ThemeSetterProvider>
    </ThemeContext.Provider>
  );
};
