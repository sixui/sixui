import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { cssLayers } from '../ThemeProvider';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  windowSizeClass: {
    compact: {
      on: '',
      off: 'initial',
      from: '',
      to: '',
    },
    medium: {
      on: '',
      off: 'initial',
      from: '',
      to: '',
    },
    expanded: {
      on: '',
      off: 'initial',
      from: '',
      to: '',
    },
    large: {
      on: '',
      off: 'initial',
      from: '',
      to: '',
    },
    extraLarge: {
      on: '',
      off: 'initial',
      from: '',
      to: '',
    },
  },
});

const classNames = createStyles({
  root: {
    '@media': {
      // TODO: generate dynamically
      '(min-width: 0) and (max-width: 599px)': {
        vars: {
          [tokens.windowSizeClass.compact.on]: 'initial',
          [tokens.windowSizeClass.compact.off]: '',
        },
      },
    },
  },
});

export type IResponsiveThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const responsiveTheme = componentThemeFactory<IResponsiveThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
