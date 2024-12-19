import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { StateLayer } from '../StateLayer';
import { themeTokens } from '../ThemeProvider';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createTheme({
  icon: {
    size: px(18),
    color: {
      normal: themeTokens.colorScheme.onSurfaceVariant,
      focused: themeTokens.colorScheme.onSurface,
      hovered: themeTokens.colorScheme.onSurface,
      pressed: themeTokens.colorScheme.onSurface,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  icon$selected: {
    color: {
      normal: themeTokens.colorScheme.primary,
      focused: themeTokens.colorScheme.primary,
      hovered: themeTokens.colorScheme.primary,
      pressed: themeTokens.colorScheme.primary,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
});

const classNames = createStyles({
  root: {
    width: tokens.icon.size,
    height: tokens.icon.size,

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        shape: px(themeTokens.shape.corner.full),
      },
      outline: {
        color: {
          normal: themeTokens.colorScheme.onSurfaceVariant,
        },
        width: {
          normal: px(themeTokens.outline.width.sm),
        },
      },
    }),
    selectors: {
      [getModifierSelector<IModifier>('disabled')]: {
        //
      },
    },
  },
  stateLayer: {
    width: px(themeTokens.density.minTargetSize),
    height: px(themeTokens.density.minTargetSize),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    vars: createTokensVars(StateLayer.theme.tokens, {
      //
    }),
  },
  focusRing: {
    width: px(themeTokens.density.minTargetSize),
    height: px(themeTokens.density.minTargetSize),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  input: {
    display: 'none',
  },
});

export type IRadioThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const RadioTheme = componentThemeFactory<IRadioThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
