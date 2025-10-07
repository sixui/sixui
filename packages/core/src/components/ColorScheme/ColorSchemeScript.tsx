import type { IStrictColorScheme } from '~/components/Theme/theme.types';
import { DEFAULT_COLOR_SCHEME_STORAGE_KEY } from './ColorSchemeScript.constants';

export type IColorSchemeScriptProps = {
  defaultColorScheme?: IStrictColorScheme;
  localStorageKey?: string;
};

/**
 * Script component that prevents flash of incorrect theme (FOIT) on page load.
 * This component must be placed in the <head> before the ThemeProvider.
 *
 * It reads the color scheme from localStorage and sets it on the document
 * element before React hydration, ensuring the correct theme is applied
 * immediately.
 *
 * @example
 * ```tsx
 * <head>
 *   <ColorSchemeScript defaultColorScheme="light" />
 * </head>
 * ```
 */
export const ColorSchemeScript: React.FC<IColorSchemeScriptProps> = ({
  defaultColorScheme = 'light',
  localStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
}) => {
  const script = `
    (function() {
      try {
        const storedColorScheme = localStorage.getItem('${localStorageKey}');
        const colorScheme = storedColorScheme === 'light' || storedColorScheme === 'dark' || storedColorScheme === 'auto' ? storedColorScheme : '${defaultColorScheme}';
        const computedColorScheme = colorScheme === 'auto' ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : colorScheme;
        document.documentElement.setAttribute('data-sixui-color-scheme', computedColorScheme);
      } catch (e) {
        document.documentElement.setAttribute('data-sixui-color-scheme', '${defaultColorScheme}');
      }
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
};
