import { createTheme, keyframes } from '@vanilla-extract/css';

import type { IInteraction } from '~/hooks/useInteractions';
import {
  componentThemeFactory,
  type IComponentThemeFactory,
} from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { themeTokens } from '../ThemeProvider';
import { calc } from '@vanilla-extract/css-utils';

type IModifier = IInteraction | 'visible' | 'variant';

const [tokensClassName, tokens] = createTheme({
  color: themeTokens.colorScheme.secondary,
  animationDuration: themeTokens.motion.duration.long.$4,
  offset: {
    inward: '0px',
    outward: '2px',
  },
  width: {
    normal: themeTokens.outline.width.md,
    active: themeTokens.outline.width.xl,
  },
});

const inwardGrowKeyframes = keyframes({
  '0%': { borderWidth: 0 },
  '100%': { borderWidth: `max(${px(tokens.width.active)}, 1px)` },
});

const inwardShrinkKeyframes = keyframes({
  '0%': { borderWidth: `max(${px(tokens.width.active)}, 1px)` },
});

const outwardGrowKeyframes = keyframes({
  '0%': { outlineWidth: 0 },
  '100%': { outlineWidth: px(tokens.width.active) },
});

const outwardShrinkKeyframes = keyframes({
  '0%': { outlineWidth: px(tokens.width.active) },
});

const classNames = createStyles({
  root: {
    animationDelay: `0s, calc(${tokens.animationDuration} * 0.25)`,
    animationDuration: `calc(${tokens.animationDuration} * 0.25), calc(${tokens.animationDuration} * 0.75)`,
    animationTimingFunction: themeTokens.motion.easing.standard.normal,
    color: tokens.color,
    borderRadius: 'inherit',
    display: 'none',
    pointerEvents: 'none',
    position: 'absolute',

    selectors: {
      [getModifierSelector<IModifier>('focused')]: {
        display: 'block',
      },
      [getModifierSelector<IModifier>({ variant: 'outward' })]: {
        animationName: `${outwardGrowKeyframes}, ${outwardShrinkKeyframes}`,
        inset: calc.negate(px(tokens.offset.outward)),
        outlineWidth: px(tokens.width.normal),
        outlineStyle: 'solid',
        outlineColor: 'currentColor',
      },
      [getModifierSelector<IModifier>({ variant: 'inward' })]: {
        animationName: `${inwardGrowKeyframes}, ${inwardShrinkKeyframes}`,
        inset: px(tokens.offset.inward),
        borderWidth: `max(${px(tokens.width.normal)}, 1px)`,
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
