import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { FocusRing } from '~/components/FocusRing';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { px } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { COMPONENT_NAME } from './ButtonBase.constants';

type IModifier = 'disabled' | 'non-interactive';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    shape: px(themeTokens.shape.corner.none),
  },
});

export const classNames = createStyles({
  root: {
    position: 'relative',
    textDecoration: 'none',
    cursor: 'pointer',
    userSelect: 'none',

    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        shape: tokens.container.shape,
      },
    }),

    selectors: {
      [modifierSelector<IModifier>('disabled')]: {
        cursor: 'default',
        pointerEvents: 'none',
      },
      [modifierSelector<IModifier>('non-interactive')]: {
        cursor: 'default',
        userSelect: 'auto',
      },
    },
  },
  background: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
  },
  touchTarget: {},
  stateLayer: {},
  focusRing: {
    vars: overrideTokens(FocusRing.theme.tokens, {
      shape: tokens.container.shape,
    }),
  },
});

export type IButtonBaseThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
  tokens: typeof tokens;
}>;

export const buttonBaseTheme = componentThemeFactory<IButtonBaseThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
