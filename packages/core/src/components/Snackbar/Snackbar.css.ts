import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getResponsiveContainerQuery } from '~/helpers/styles/getResponsiveContainerQuery';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';

type IModifier = 'justify';

const [tokensClassName, tokens] = createTheme({
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

        '@container': {
          [getResponsiveContainerQuery({ size: 'compact' })]: {
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

    '@container': {
      [getResponsiveContainerQuery({ size: 'compact' })]: {
        flexGrow: 1,
        minWidth: 'unset',
      },
    },
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
