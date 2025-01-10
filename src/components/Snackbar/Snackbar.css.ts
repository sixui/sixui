import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { cssLayers, themeTokens } from '../ThemeProvider';

type IModifier = 'justify';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  fixedHorizontalSpace: {
    normal: px(24),
    compact: px(32),
  },
  fixedBottomSpace: px(24),
});

const classNames = createStyles({
  root: {
    display: 'flex',
    position: 'fixed',
    bottom: tokens.fixedBottomSpace,
    zIndex: themeTokens.zIndex.overlay,
    minWidth: 'unset',

    selectors: {
      [getModifierSelector<IModifier>({ justify: 'start' })]: {
        left: tokens.fixedHorizontalSpace.normal,
        justifyContent: 'start',

        '@media': {
          '(min-width: 0px) and (max-width: 599px)': {
            left: tokens.fixedHorizontalSpace.compact,
          },
        },
      },
      [getModifierSelector<IModifier>({ justify: 'center' })]: {
        left: tokens.fixedHorizontalSpace.compact,
        right: tokens.fixedHorizontalSpace.compact,
        justifyContent: 'center',
      },
    },
  },
  snackbarContent: {
    transformOrigin: 'bottom',
  },
});

export type ISnackbarThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const snackbarTheme = componentThemeFactory<ISnackbarThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
