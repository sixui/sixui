import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import type { IDrawerVariant } from './Drawer.types';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { themeTokens } from '~/components/Theme/theme.css';
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
        left: 0,
        marginLeft: tokens.inset,
      },
      [modifierSelector<IModifier>({ side: 'right' })]: {
        right: 0,
        marginRight: tokens.inset,
      },
      [modifierSelector<IModifier>({ side: 'top' })]: {
        top: 0,
        marginTop: tokens.inset,
      },
      [modifierSelector<IModifier>({ side: 'bottom' })]: {
        bottom: 0,
        marginBottom: tokens.inset,
      },
      [modifierSelector<IModifier>('full-height')]: {
        top: 0,
        bottom: 0,
        marginTop: tokens.inset,
        marginBottom: tokens.inset,
      },
      [modifierSelector<IModifier>('full-width')]: {
        left: 0,
        right: 0,
        marginLeft: tokens.inset,
        marginRight: tokens.inset,
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
        inset: px(space('$lg')),
      }),
    },
  }),
};
