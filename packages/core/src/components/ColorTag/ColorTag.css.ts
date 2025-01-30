import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { Checkmark } from '~/components/Checkmark';
import { ColorTagIndicator } from '~/components/ColorTag/ColorTagIndicator';
import { PaperBase } from '~/components/PaperBase';
import { StateLayer } from '~/components/StateLayer';
import { themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { ButtonBase } from '../ButtonBase';
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
      ...createTokensVars(ButtonBase.theme.tokens, {
        container: {
          shape: tokens.container.shape,
        },
      }),
      ...createTokensVars(PaperBase.theme.tokens, {
        container: {
          color: 'transparent',
        },
        outline: {
          color: tokens.foreground.color,
        },
      }),
    },
    selectors: {
      [getModifierSelector<IModifier>('disabled')]: {
        opacity: themeTokens.state.opacity.disabled,
      },
    },
  },
  stateLayer: {
    vars: createTokensVars(StateLayer.theme.tokens, {
      color: {
        hovered: tokens.foreground.color,
        pressed: tokens.foreground.color,
      },
    }),
  },
  indicator: {
    vars: createTokensVars(ColorTagIndicator.theme.tokens, {
      container: {
        shape: tokens.container.shape,
      },
    }),
  },
  checkmark: {
    width: tokens.icon.size,
    height: tokens.icon.size,

    vars: createTokensVars(Checkmark.theme.tokens, {
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
