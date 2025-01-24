import { createTheme } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { Diagonals } from '~/components/Diagonals';
import { PaperBase } from '~/components/PaperBase';
import { cssLayers, themeTokens } from '~/components/ThemeProvider';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';

type IModifier = 'empty' | 'invalid' | 'outlined';

const DENSITY = px(getDensity({ min: -3, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    width: px(40),
    height: px(40),
    shape: px(themeTokens.shape.corner.circle),
    color: {
      normal: themeTokens.colorScheme.surfaceContainerHighest,
      empty: 'transparent',
      invalid: 'transparent',
    },
  },
  outline: {
    width: {
      normal: px(themeTokens.outline.width.none),
      empty: px(themeTokens.outline.width.xs),
      invalid: px(themeTokens.outline.width.xs),
    },
    color: {
      normal: 'unset',
      empty: themeTokens.colorScheme.outline,
      invalid: themeTokens.colorScheme.outline,
    },
    opacity: {
      normal: '1',
      empty: '1',
      invalid: '1',
    },
  },
  diagonals: {
    color: {
      empty: themeTokens.colorScheme.outline,
      invalid: themeTokens.colorScheme.error,
    },
    width: {
      empty: px(themeTokens.outline.width.none),
      invalid: px(themeTokens.outline.width.sm),
    },
    opacity: {
      empty: '1',
      invalid: themeTokens.state.opacity.disabled,
    },
  },
});

const classNames = createStyles({
  root: {
    width: calc.add(tokens.container.width, DENSITY),
    height: calc.add(tokens.container.height, DENSITY),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: px(space(2)),

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        shape: tokens.container.shape,
        color: tokens.container.color.normal,
      },
      outline: {
        width: tokens.outline.width.normal,
        color: tokens.outline.color.normal,
        opacity: tokens.outline.opacity.normal,
      },
    }),
    selectors: {
      [getModifierSelector<IModifier>('outlined')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          outline: {
            width: px(themeTokens.outline.width.xs),
            opacity: '0.5',
          },
        }),
      },
      [getModifierSelector<IModifier>('empty')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.empty,
          },
          outline: {
            width: tokens.outline.width.empty,
            color: tokens.outline.color.empty,
            opacity: tokens.outline.opacity.empty,
          },
        }),
      },
      [getModifierSelector<IModifier>(['invalid', '!empty'])]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.invalid,
          },
          outline: {
            width: tokens.outline.width.invalid,
            color: tokens.outline.color.invalid,
            opacity: tokens.outline.opacity.invalid,
          },
        }),
      },
    },
  },
  content: {
    display: 'flex',
    gap: px(space(1)),
  },
  diagonals: ({ root }) => ({
    display: 'none',

    selectors: {
      [`${getModifierSelector<IModifier>('empty', root)}`]: {
        display: 'block',

        vars: createTokensVars(Diagonals.theme.tokens, {
          color: tokens.diagonals.color.empty,
          width: tokens.diagonals.width.empty,
          opacity: tokens.diagonals.opacity.empty,
        }),
      },
      [`${getModifierSelector<IModifier>(['invalid', '!empty'], root)}`]: {
        display: 'block',

        vars: createTokensVars(Diagonals.theme.tokens, {
          color: tokens.diagonals.color.invalid,
          width: tokens.diagonals.width.invalid,
          opacity: tokens.diagonals.opacity.invalid,
        }),
      },
    },
  }),
});

export type IColorTagIndicatorThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const colorTagIndicatorTheme =
  componentThemeFactory<IColorTagIndicatorThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
