import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { modifierSelector } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './BurgerIndicator.constants';

type IModifier = 'opened';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    size: px(24),
  },
  lines: {
    color: themeTokens.colorScheme.onSurface,
  },
});

const classNames = createStyles({
  root: {
    width: tokens.container.size,
    height: tokens.container.size,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  burger: ({ root }) => ({
    position: 'relative',
    userSelect: 'none',

    display: 'block',
    width: tokens.container.size,
    height: calc.divide(tokens.container.size, 12),
    backgroundColor: tokens.lines.color,
    outlineWidth: 1,
    outlineStyle: 'solid',
    outlineColor: 'transparent',
    transitionProperty: 'background-color, transform',
    transitionDuration: themeTokens.motion.duration.medium2,
    transitionTimingFunction: themeTokens.motion.easing.standard.normal,

    '::before': {
      display: 'block',
      width: tokens.container.size,
      height: calc.divide(tokens.container.size, 12),
      backgroundColor: tokens.lines.color,
      outlineWidth: 1,
      outlineStyle: 'solid',
      outlineColor: 'transparent',
      transitionProperty: 'background-color, transform',
      transitionDuration: themeTokens.motion.duration.medium2,
      transitionTimingFunction: themeTokens.motion.easing.standard.normal,

      position: 'absolute',
      content: '',
      insetInlineStart: 0,

      top: calc.negate(calc.divide(tokens.container.size, 3)),
    },

    '::after': {
      display: 'block',
      width: tokens.container.size,
      height: calc.divide(tokens.container.size, 12),
      backgroundColor: tokens.lines.color,
      outlineWidth: 1,
      outlineStyle: 'solid',
      outlineColor: 'transparent',
      transitionProperty: 'background-color, transform',
      transitionDuration: themeTokens.motion.duration.medium2,
      transitionTimingFunction: themeTokens.motion.easing.standard.normal,

      position: 'absolute',
      content: '',
      insetInlineStart: 0,

      top: calc.divide(tokens.container.size, 3),
    },

    selectors: {
      [modifierSelector<IModifier>('opened', root)]: {
        backgroundColor: 'transparent',
      },

      [`${modifierSelector<IModifier>('opened', root)}::before`]: {
        transform: `translateY(${calc.divide(tokens.container.size, 3)}) rotate(45deg)`,
      },

      [`${modifierSelector<IModifier>('opened', root)}::after`]: {
        transform: `translateY(${calc.negate(calc.divide(tokens.container.size, 3))}) rotate(-45deg)`,
      },
    },
  }),
});

export type IBurgerIndicatorThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const burgerIndicatorTheme =
  componentThemeFactory<IBurgerIndicatorThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
