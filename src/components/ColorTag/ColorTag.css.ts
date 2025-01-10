import { createTheme } from '@vanilla-extract/css';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { Button } from '../Button';
import { ColorTagIndicator } from '../ColorTagIndicator';
import { PaperBase } from '../PaperBase';
import { StateLayer } from '../StateLayer';
import { cssLayers, themeTokens } from '../ThemeProvider';

type IModifier = IInteraction | 'outlined';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    shape: themeTokens.shape.corner.xs,
  },
  foreground: {
    color: themeTokens.colorScheme.onSurface,
  },
});

const classNames = createStyles({
  root: {
    transitionProperty: 'transform, border-radius',
    transitionDuration: themeTokens.motion.duration.short.$3,
    transitionTimingFunction: themeTokens.motion.easing.standard.normal,
    transform: 'scale(1)',
    color: tokens.foreground.color,

    vars: {
      ...createTokensVars(PaperBase.theme.tokens, {
        container: {
          shape: tokens.container.shape,
        },
        outline: {
          color: tokens.foreground.color,
        },
      }),
      ...createTokensVars(Button.theme.tokens, {
        container: {
          color: {
            normal: 'transparent',
            disabled: 'transparent',
          },
          leadingSpace: {
            normal: '0px',
            withStartSlot: '0px',
            withEndSlot: '0px',
          },
          trailingSpace: {
            normal: '0px',
            withStartSlot: '0px',
            withEndSlot: '0px',
          },
          minWidth: '40px',
          height: '40px',
        },
      }),
    },
    selectors: {
      [getModifierSelector<IModifier>('focused')]: {
        transform: 'scale(1.1)',
      },
      [getModifierSelector<IModifier>('loading')]: {
        transform: 'scale(1.1)',
      },
      [getModifierSelector<IModifier>('hovered')]: {
        transform: 'scale(1.1)',
      },
      [getModifierSelector<IModifier>('pressed')]: {
        transform: 'scale(1.1)',
      },
      [getModifierSelector<IModifier>('outlined')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          outline: {
            width: px(themeTokens.outline.width.xs),
          },
        }),
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
