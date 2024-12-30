import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { ICardVariant } from './Card.types';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

type IModifier = 'disabled';

const classNames = createStyles({
  root: {
    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: {
          normal: themeTokens.colorScheme.surfaceContainerHighest,
        },
        elevation: {
          normal: elevationLevelPreset[0],
          focused: elevationLevelPreset[0],
          hovered: elevationLevelPreset[1],
          pressed: elevationLevelPreset[0],
        },
        shape: themeTokens.shape.corner.md,
      },
    }),
  },
});

export type ICardThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
  variant: ICardVariant;
}>;

export const cardTheme = componentThemeFactory<ICardThemeFactory>({
  classNames,
  tokens: undefined,
});

export const cardThemeVariants = {
  filled: createStyles({
    root: {
      vars: createTokensVars(PaperBase.theme.tokens, {
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
          opacity: {},
        },
      }),
    },
  }),
  elevated: createStyles({
    root: {
      vars: createTokensVars(PaperBase.theme.tokens, {
        container: {
          color: {
            normal: themeTokens.colorScheme.surfaceContainerLow,
            disabled: themeTokens.colorScheme.surface,
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
      vars: createTokensVars(PaperBase.theme.tokens, {
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
            normal: themeTokens.outline.width.xs,
          },
        },
      }),
    },
  }),
};
