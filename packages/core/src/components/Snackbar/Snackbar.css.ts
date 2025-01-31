import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { px } from '~/utils/css/px';
import { responsiveContainerQuery } from '~/utils/css/responsiveContainerQuery';
import { COMPONENT_NAME } from './Snackbar.constants';

type IModifier = 'justify';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
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
      [modifierSelector<IModifier>({ justify: 'start' })]: {
        left: tokens.fixedHorizontalSpace.normal,
        justifyContent: 'start',

        '@container': {
          [responsiveContainerQuery({ size: 'compact' })]: {
            left: tokens.fixedHorizontalSpace.compact,
          },
        },
      },
      [modifierSelector<IModifier>({ justify: 'center' })]: {
        left: tokens.fixedHorizontalSpace.compact,
        right: tokens.fixedHorizontalSpace.compact,
        justifyContent: 'center',
      },
    },
  },
  snackbarContent: {
    transformOrigin: 'bottom',

    '@container': {
      [responsiveContainerQuery({ size: 'compact' })]: {
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
