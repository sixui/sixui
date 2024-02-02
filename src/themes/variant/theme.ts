import type { ITheme } from '../theme.types';
import { componentTheme as filledButtonTheme } from './Button/FilledButton.stylex';
import { theme as baseTheme } from '../base';

export const theme: ITheme = {
  name: 'Material Design 3 (variant)',
  components: {
    ...baseTheme.components,

    FilledButton: {
      ...baseTheme.components.FilledButton,
      // TODO: I want that all buttons to my theme (larger height and smaller corners). But it's not yet possible, see: https://github.com/facebook/stylex/issues/242
      vars: filledButtonTheme,
    },
  },
} satisfies typeof baseTheme;
