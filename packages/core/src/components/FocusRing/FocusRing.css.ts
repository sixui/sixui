import { keyframes } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';

type IModifier = 'visible' | 'variant';

const [tokensClassName, tokens] = createTheme({
  color: themeTokens.colorScheme.secondary,
  shape: 'inherit',
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
    borderRadius: tokens.shape,
    display: 'none',
    pointerEvents: 'none',

    selectors: {
      [getModifierSelector<IModifier>('visible')]: {
        display: 'block',
      },
      [getModifierSelector<IModifier>({ variant: 'outward' })]: {
        animationName: `${outwardGrowKeyframes}, ${outwardShrinkKeyframes}`,
        inset: calc.negate(tokens.offset.outward),
        outlineWidth: tokens.width.normal,
        outlineStyle: 'solid',
        outlineColor: 'currentColor',
      },
      [getModifierSelector<IModifier>({ variant: 'inward' })]: {
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
