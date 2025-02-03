import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { ButtonBase } from '~/components/ButtonBase';
import { Checkmark } from '~/components/Checkmark';
import { ColorTagIndicator } from '~/components/ColorTag/ColorTagIndicator';
import { PaperBase } from '~/components/PaperBase';
import { StateLayer } from '~/components/StateLayer';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './ColorTag.constants';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    shape: px(themeTokens.shape.corner.circle),
  },
  icon: {
    size: px(18),
  },
  foreground: {
    color: themeTokens.colorScheme.onSurface,
  },
});

const classNames = createStyles({
  root: {
    color: tokens.foreground.color,

    vars: {
      ...overrideTokens(ButtonBase.theme.tokens, {
        container: {
          shape: tokens.container.shape,
        },
      }),
      ...overrideTokens(PaperBase.theme.tokens, {
        container: {
          color: 'transparent',
        },
        outline: {
          color: tokens.foreground.color,
        },
      }),
    },
    selectors: {
      [modifierSelector<IModifier>('disabled')]: {
        opacity: themeTokens.state.opacity.disabled,
      },
    },
  },
  stateLayer: {
    vars: overrideTokens(StateLayer.theme.tokens, {
      color: {
        hovered: tokens.foreground.color,
        pressed: tokens.foreground.color,
      },
    }),
  },
  indicator: {
    vars: overrideTokens(ColorTagIndicator.theme.tokens, {
      container: {
        shape: tokens.container.shape,
      },
    }),
  },
  checkmark: {
    width: tokens.icon.size,
    height: tokens.icon.size,

    vars: overrideTokens(Checkmark.theme.tokens, {
      color: tokens.foreground.color,
    }),
  },
});

export type IColorTagThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const colorTagTheme = componentThemeFactory<IColorTagThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
