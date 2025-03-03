import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { Diagonals } from '~/components/Diagonals';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { COMPONENT_NAME } from './ColorTagIndicator.constants';

type IModifier = 'empty' | 'invalid' | 'outlined';

const DENSITY = px(density({ min: -3, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
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
    padding: px(space('$sm')),

    vars: overrideTokens(PaperBase.theme.tokens, {
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
      [modifierSelector<IModifier>('outlined')]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          outline: {
            width: px(themeTokens.outline.width.xs),
            opacity: '0.5',
          },
        }),
      },
      [modifierSelector<IModifier>('empty')]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
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
      [modifierSelector<IModifier>(['invalid', '!empty'])]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
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
    gap: px(space('$xs')),
  },
  diagonals: ({ root }) => ({
    display: 'none',

    selectors: {
      [modifierSelector<IModifier>('empty', root)]: {
        display: 'block',

        vars: overrideTokens(Diagonals.theme.tokens, {
          color: tokens.diagonals.color.empty,
          width: tokens.diagonals.width.empty,
          opacity: tokens.diagonals.opacity.empty,
        }),
      },
      [modifierSelector<IModifier>(['invalid', '!empty'], root)]: {
        display: 'block',

        vars: overrideTokens(Diagonals.theme.tokens, {
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
