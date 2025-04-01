import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { overrideTokens, space } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { px } from '~/utils/css/px';
import { responsiveContainerQuery } from '~/utils/css/responsiveContainerQuery';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './Snackbar.constants';
import { SnackbarContent } from './SnackbarContent';

type IModifier = 'justify' | 'opened';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    minHeight: px(48),
  },
  position: '0',
  gap: px(space('$md')),
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
    bottom: px(
      calc.add(
        tokens.fixedBottomSpace,
        calc.multiply(
          calc.add(tokens.container.minHeight, tokens.gap),
          tokens.position,
        ),
      ),
    ),
    minWidth: 'unset',

    transitionProperty: 'bottom',
    transitionDuration: themeTokens.motion.duration.short3,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.accelerate,

    selectors: {
      [modifierSelector<IModifier>({ opened: true })]: {
        zIndex: themeTokens.zIndex.overlay,
      },
      [modifierSelector<IModifier>({ justify: 'start' })]: {
        left: tokens.fixedHorizontalSpace.normal,
        justifyContent: 'flex-start',
      },
      [modifierSelector<IModifier>({ justify: 'center' })]: {
        left: `max(50%, ${tokens.fixedHorizontalSpace.compact})`,
        right: `max(50%, ${tokens.fixedHorizontalSpace.compact})`,
        transform: 'translateX(-50%)',
        justifyContent: 'center',
      },
    },

    '@container': {
      [responsiveContainerQuery({ size: 'compact' })]: {
        left: tokens.fixedHorizontalSpace.compact,
        right: tokens.fixedHorizontalSpace.compact,
        transform: 'unset',
      },
    },
  },
  motion: {
    '@container': {
      [responsiveContainerQuery({ size: 'compact' })]: {
        flexGrow: 1,
        minWidth: 'unset',
      },
    },
  },
  snackbarContent: {
    transformOrigin: 'bottom',

    vars: overrideTokens(SnackbarContent.theme.tokens, {
      container: {
        minHeight: tokens.container.minHeight,
      },
    }),
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
