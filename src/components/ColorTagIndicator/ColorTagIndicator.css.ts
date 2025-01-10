import { createTheme } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { cssLayers, themeTokens } from '../ThemeProvider';

type IModifier = 'empty' | 'invalid' | 'outlined';

const DENSITY = px(getDensity({ min: -3, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    minWidth: px(40),
    height: px(40),
    shape: themeTokens.shape.corner.xs,
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
  crosshairs: {
    color: {
      empty: themeTokens.colorScheme.outlineVariant,
      invalid: themeTokens.colorScheme.error,
    },
    width: {
      empty: px(themeTokens.outline.width.xs),
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
    minWidth: tokens.container.minWidth,
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
        vars: createTokensVars(tokens, {
          outline: {
            width: {
              normal: px(themeTokens.outline.width.xs),
            },
            opacity: {
              normal: '0.6',
            },
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
  crosshairs: ({ root }) => ({
    overflow: 'hidden',
    borderRadius: 'inherit',
    position: 'absolute',
    inset: 0,
    '::before': {
      content: '',
      position: 'absolute',
      top: 0,
      left: 0,
      borderTopStyle: 'solid',
      width: '150%',
      transformOrigin: 'top left',
      transform: 'rotate(45deg)',
    },
    '::after': {
      content: '',
      position: 'absolute',
      bottom: 0,
      left: 0,
      borderBottomStyle: 'solid',
      width: '150%',
      transformOrigin: 'top left',
      transform: 'rotate(-45deg)',
    },
    display: 'none',

    selectors: {
      [`${getModifierSelector<IModifier>('empty', root)}`]: {
        display: 'block',
      },
      [`${getModifierSelector<IModifier>('empty', root)}::before`]: {
        opacity: tokens.crosshairs.opacity.empty,
        borderColor: tokens.crosshairs.color.empty,
        borderTopWidth: tokens.crosshairs.width.empty,
      },
      [`${getModifierSelector<IModifier>('empty', root)}::after`]: {
        display: 'block',
        opacity: tokens.crosshairs.opacity.empty,
        borderColor: tokens.crosshairs.color.empty,
        borderBottomWidth: tokens.crosshairs.width.empty,
      },
      [`${getModifierSelector<IModifier>(['invalid', '!empty'], root)}`]: {
        display: 'block',
      },
      [`${getModifierSelector<IModifier>(['invalid', '!empty'], root)}::before`]:
        {
          display: 'block',
          opacity: tokens.crosshairs.opacity.invalid,
          borderColor: tokens.crosshairs.color.invalid,
          borderTopWidth: tokens.crosshairs.width.invalid,
        },
      [`${getModifierSelector<IModifier>(['invalid', '!empty'], root)}::after`]:
        {
          display: 'block',
          opacity: tokens.crosshairs.opacity.invalid,
          borderColor: tokens.crosshairs.color.invalid,
          borderBottomWidth: tokens.crosshairs.width.invalid,
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
