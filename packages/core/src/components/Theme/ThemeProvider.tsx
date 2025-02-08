import type { PartialDeep } from 'type-fest/source/partial-deep';
import { useContext, useMemo, useRef, useState } from 'react';
import { FloatingDelayGroup } from '@floating-ui/react';
import cx from 'clsx';

import type { IThemeContextValue } from './Theme.context';
import type { ITheme, IThemeOverride } from './theme.types';
import type { IThemeProviderProps } from './ThemeProvider.types';
import type { IThemeSetterContextValue } from './ThemeSetter.context';
import { partialAssignInlineVars } from '~/utils/css/partialAssignInlineVars';
import { textFromCssProperties } from '~/utils/css/textFromCssProperties';
import { deepMerge } from '~/utils/deepMerge';
import { ThemeContext } from './Theme.context';
import { ThemeSetterProvider } from './ThemeSetter.context';
import { mergeThemeOverrides } from './utils/mergeThemeOverrides';
import {
  defaultTheme,
  styles,
  themeTokens,
  themeTokensClassName,
} from './ThemeProvider.css';

/**
 * @see https://m3.material.io/styles/color/system/how-the-system-works
 */
export const ThemeProvider: React.FC<IThemeProviderProps> = (props) => {
  const {
    className,
    style,
    children,
    theme,
    colorSchemeVariant: colorSchemeVariantProp,
    inherit,
    stylesTarget,
    ...other
  } = props;

  const themeContext = useContext(ThemeContext);

  const parentTheme = inherit ? themeContext?.theme : undefined;
  const colorSchemeVariant =
    colorSchemeVariantProp ?? themeContext?.colorSchemeVariant ?? 'light';

  const [dynamicTheme, setDynamicTheme] = useState<
    IThemeOverride | undefined
  >();
  const mergedTheme = useMemo(
    () => mergeThemeOverrides(parentTheme ?? defaultTheme, theme, dynamicTheme),
    [parentTheme, theme, dynamicTheme],
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
    const tokensOverride = deepMerge(
      dynamicTheme?.tokens ?? ({} as PartialDeep<ITheme['tokens']>),
      theme?.tokens,
    );
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

  const themeVars = partialAssignInlineVars(themeTokens, themeOverrideVars);

  if (stylesTarget) {
    stylesTarget.classList.add(
      ...cx(
        styles.root,
        parentTheme ? undefined : themeTokensClassName,
        className,
      ).split(' '),
    );

    stylesTarget.setAttribute(
      'style',
      textFromCssProperties({
        ...style,
        ...themeVars,
      }),
    );
  }

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
            className={
              stylesTarget
                ? undefined
                : cx(
                    styles.root,
                    parentTheme ? undefined : themeTokensClassName,
                    className,
                  )
            }
            style={
              stylesTarget
                ? undefined
                : {
                    ...style,
                    ...themeVars,
                  }
            }
            ref={rootRef}
            {...other}
          >
            {children}
          </div>
        </FloatingDelayGroup>
      </ThemeSetterProvider>
    </ThemeContext.Provider>
  );
};
