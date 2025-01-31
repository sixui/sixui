import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import type { IDrawerVariant } from './Drawer.types';
import { themeTokens } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { COMPONENT_NAME } from './Drawer.constants';

type IModifier = 'side' | 'full-height' | 'full-width';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  inset: px(0),
});

const classNames = createStyles({
  root: {
    position: 'fixed',
    display: 'flex',

    selectors: {
      [modifierSelector<IModifier>({ side: 'left' })]: {
        left: tokens.inset,
      },
      [modifierSelector<IModifier>({ side: 'right' })]: {
        right: tokens.inset,
      },
      [modifierSelector<IModifier>({ side: 'top' })]: {
        top: tokens.inset,
      },
      [modifierSelector<IModifier>({ side: 'bottom' })]: {
        bottom: tokens.inset,
      },
      [modifierSelector<IModifier>('full-height')]: {
        top: tokens.inset,
        bottom: tokens.inset,
      },
      [modifierSelector<IModifier>('full-width')]: {
        left: tokens.inset,
        right: tokens.inset,
      },
    },
  },
  popover: {
    zIndex: themeTokens.zIndex.modal,
  },
});

export type IDrawerThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
  variant: IDrawerVariant;
}>;

export const drawerTheme = componentThemeFactory<IDrawerThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});

export const drawerThemeVariants = {
  standard: createStyles(),
  detached: createStyles({
    root: {
      vars: overrideTokens(tokens, {
        inset: px(space(4)),
      }),
    },
  }),
};
