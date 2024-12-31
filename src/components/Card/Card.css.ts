import { createTheme, fallbackVar } from '@vanilla-extract/css';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { ICardVariant } from './Card.types';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { cssLayers, themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

type IModifier = IInteraction | 'disabled';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    shape: themeTokens.shape.corner.md,
    color: {
      normal: themeTokens.colorScheme.surface,
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
      dragged: 'inherit',
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.containerOpacity.disabled,
    },
    elevation: {
      normal: 'unset',
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
      dragged: 'inherit',
      disabled: 'unset',
    },
  },
  outline: {
    width: {
      normal: px(0),
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
      dragged: 'inherit',
      disabled: 'unset',
    },
    color: {
      normal: themeTokens.colorScheme.outlineVariant,
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
      dragged: 'inherit',
      disabled: 'unset',
    },
    opacity: {
      disabled: themeTokens.state.outlineOpacity.disabled,
    },
  },
});

const classNames = createStyles({
  root: {
    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        shape: tokens.container.shape,
        color: tokens.container.color.normal,
        elevation: tokens.container.elevation.normal,
      },
    }),
    selectors: {
      [getModifierSelector<IModifier>('focused')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: fallbackVar(
              tokens.container.color.focused,
              tokens.container.color.normal,
            ),
            elevation: fallbackVar(
              tokens.container.elevation.focused,
              tokens.container.elevation.normal,
            ),
          },
          outline: {
            color: fallbackVar(
              tokens.outline.color.focused,
              tokens.outline.color.normal,
            ),
            width: fallbackVar(
              tokens.outline.width.focused,
              tokens.outline.width.normal,
            ),
          },
        }),
      },
      [getModifierSelector<IModifier>('hovered')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: fallbackVar(
              tokens.container.color.hovered,
              tokens.container.color.normal,
            ),
            elevation: fallbackVar(
              tokens.container.elevation.hovered,
              tokens.container.elevation.normal,
            ),
          },
          outline: {
            color: fallbackVar(
              tokens.outline.color.hovered,
              tokens.outline.color.normal,
            ),
            width: fallbackVar(
              tokens.outline.width.hovered,
              tokens.outline.width.normal,
            ),
          },
        }),
      },
      [getModifierSelector<IModifier>('pressed')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: fallbackVar(
              tokens.container.color.pressed,
              tokens.container.color.normal,
            ),
            elevation: fallbackVar(
              tokens.container.elevation.pressed,
              tokens.container.elevation.normal,
            ),
          },
          outline: {
            color: fallbackVar(
              tokens.outline.color.pressed,
              tokens.outline.color.normal,
            ),
            width: fallbackVar(
              tokens.outline.width.pressed,
              tokens.outline.width.normal,
            ),
          },
        }),
      },
      [getModifierSelector<IModifier>('dragged')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: fallbackVar(
              tokens.container.color.dragged,
              tokens.container.color.normal,
            ),
            elevation: fallbackVar(
              tokens.container.elevation.dragged,
              tokens.container.elevation.normal,
            ),
          },
          outline: {
            color: fallbackVar(
              tokens.outline.color.dragged,
              tokens.outline.color.normal,
            ),
            width: fallbackVar(
              tokens.outline.width.dragged,
              tokens.outline.width.normal,
            ),
          },
        }),
      },
      [getModifierSelector<IModifier>('disabled')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.disabled,
            elevation: tokens.container.elevation.disabled,
            opacity: tokens.container.opacity.disabled,
          },
          outline: {
            color: tokens.outline.color.disabled,
            width: tokens.outline.width.disabled,
            opacity: tokens.outline.opacity.disabled,
          },
        }),
      },
    },
  },
});

export type ICardThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
  variant: ICardVariant;
  tokens: typeof tokens;
}>;

export const cardTheme = componentThemeFactory<ICardThemeFactory>({
  classNames,
  tokens,
  tokensClassName,
});

export const cardThemeVariants = {
  filled: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        container: {
          color: {
            normal: themeTokens.colorScheme.surfaceContainerHighest,
          },
          elevation: {
            normal: elevationLevelPreset[0],
            focused: elevationLevelPreset[0],
            hovered: elevationLevelPreset[1],
            pressed: elevationLevelPreset[0],
            dragged: elevationLevelPreset[4],
            disabled: elevationLevelPreset[0],
          },
        },
      }),
    },
  }),
  elevated: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        container: {
          color: {
            normal: themeTokens.colorScheme.surfaceContainerLow,
          },
          elevation: {
            normal: elevationLevelPreset[1],
            focused: elevationLevelPreset[0],
            hovered: elevationLevelPreset[2],
            pressed: elevationLevelPreset[1],
            dragged: elevationLevelPreset[4],
            disabled: elevationLevelPreset[1],
          },
        },
      }),
    },
  }),
  outlined: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        container: {
          color: {
            normal: themeTokens.colorScheme.surface,
            disabled: themeTokens.colorScheme.surfaceContainerHighest,
          },
          elevation: {
            normal: elevationLevelPreset[0],
            focused: elevationLevelPreset[0],
            hovered: elevationLevelPreset[0],
            pressed: elevationLevelPreset[0],
            dragged: elevationLevelPreset[3],
            disabled: elevationLevelPreset[0],
          },
        },
        outline: {
          color: {
            normal: themeTokens.colorScheme.outlineVariant,
            disabled: themeTokens.colorScheme.outline,
          },
          width: {
            normal: px(themeTokens.outline.width.xs),
          },
        },
      }),
    },
  }),
};
