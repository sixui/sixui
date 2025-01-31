import { fallbackVar, keyframes } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './FocusRing.constants';

type IModifier = 'visible' | 'variant';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  color: themeTokens.colorScheme.secondary,
  shape: 'unset',
  animationDuration: themeTokens.motion.duration.long4,
  offset: {
    inward: px(0),
    outward: px(2),
  },
  width: {
    normal: px(themeTokens.outline.width.md),
    active: px(themeTokens.outline.width.lg),
  },
});

const inwardGrowKeyframes = keyframes({
  '0%': { borderWidth: 0 },
  '100%': { borderWidth: `max(${tokens.width.active}, 1px)` },
});

const inwardShrinkKeyframes = keyframes({
  '0%': { borderWidth: `max(${tokens.width.active}, 1px)` },
});

const outwardGrowKeyframes = keyframes({
  '0%': { outlineWidth: 0 },
  '100%': { outlineWidth: tokens.width.active },
});

const outwardShrinkKeyframes = keyframes({
  '0%': { outlineWidth: tokens.width.active },
});

const classNames = createStyles({
  root: {
    position: 'absolute',
    zIndex: 1,
    animationDelay: `0s, calc(${tokens.animationDuration} * 0.25)`,
    animationDuration: `calc(${tokens.animationDuration} * 0.25), calc(${tokens.animationDuration} * 0.75)`,
    animationTimingFunction: themeTokens.motion.easing.standard.normal,
    color: tokens.color,
    borderRadius: fallbackVar(tokens.shape, 'inherit'),
    display: 'none',
    pointerEvents: 'none',

    selectors: {
      [modifierSelector<IModifier>('visible')]: {
        display: 'block',
      },
      [modifierSelector<IModifier>({ variant: 'outward' })]: {
        animationName: `${outwardGrowKeyframes}, ${outwardShrinkKeyframes}`,
        inset: calc.negate(tokens.offset.outward),
        outlineWidth: tokens.width.normal,
        outlineStyle: 'solid',
        outlineColor: 'currentColor',
      },
      [modifierSelector<IModifier>({ variant: 'inward' })]: {
        animationName: `${inwardGrowKeyframes}, ${inwardShrinkKeyframes}`,
        inset: tokens.offset.inward,
        borderWidth: `max(${tokens.width.normal}, 1px)`,
        borderStyle: 'solid',
        borderColor: 'currentColor',
      },
    },
  },
});

export type IFocusRingThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const focusRingTheme = componentThemeFactory<IFocusRingThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
