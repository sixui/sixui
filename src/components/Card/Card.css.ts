import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { ICardVariant } from './Card.types';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { cssLayers, themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    shape: themeTokens.shape.corner.md,
  },
});

const classNames = createStyles({
  root: {
    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: themeTokens.colorScheme.surfaceContainerHighest,
        elevation: {
          normal: elevationLevelPreset[0],
          focused: elevationLevelPreset[0],
          hovered: elevationLevelPreset[1],
          pressed: elevationLevelPreset[0],
        },
        shape: tokens.container.shape,
      },
    }),
    selectors: {
      [getModifierSelector<IModifier>('disabled')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: themeTokens.colorScheme.surface,
            opacity: themeTokens.state.opacity.disabled,
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
      vars: createTokensVars(PaperBase.theme.tokens, {
        container: {
          color: themeTokens.colorScheme.surfaceContainerHighest,
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
      vars: createTokensVars(PaperBase.theme.tokens, {
        container: {
          color: themeTokens.colorScheme.surfaceContainerLow,
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
      vars: createTokensVars(PaperBase.theme.tokens, {
        container: {
          color: themeTokens.colorScheme.surface,
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
            normal: themeTokens.outline.width.xs,
          },
        },
      }),
      selectors: {
        [getModifierSelector<IModifier>('disabled')]: {
          vars: createTokensVars(PaperBase.theme.tokens, {
            container: {
              color: themeTokens.colorScheme.surfaceContainerHighest,
            },
          }),
        },
      },
    },
  }),
};
