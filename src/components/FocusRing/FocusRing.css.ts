import { createTheme, keyframes, style } from '@vanilla-extract/css';

import {
  stylesFactory,
  type IStylesFactory,
} from '~/utils/styles/stylesFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { themeTokens } from '../ThemeProvider';
import { calc } from '@vanilla-extract/css-utils';

type IModifier = 'visible' | 'variant';

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
  '100%': { borderWidth: px(tokens.width.active) },
});

const inwardShrinkKeyframes = keyframes({
  '0%': { borderWidth: px(tokens.width.active) },
});

const outwardGrowKeyframes = keyframes({
  '0%': { outlineWidth: 0 },
  '100%': { outlineWidth: px(tokens.width.active) },
});

const outwardShrinkKeyframes = keyframes({
  '0%': { outlineWidth: px(tokens.width.active) },
});

const classNames = {
  root: style({
    animationDelay: `0s, calc(${tokens.animationDuration} * 0.25)`,
    animationDuration: `calc(${tokens.animationDuration} * 0.25), calc(${tokens.animationDuration} * 0.75)`,
    animationTimingFunction: themeTokens.motion.easing.standard.normal,
    color: tokens.color,
    borderRadius: 'inherit',
    display: 'none',
    pointerEvents: 'none',
    position: 'absolute',

    selectors: {
      [getModifierSelector<IModifier>('visible')]: {
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
        borderWidth: px(tokens.width.normal),
        borderStyle: 'solid',
        borderColor: 'currentColor',
      },
    },
  }),
};

export type IFocusRingStylesFactory = IStylesFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const focusRingStyles = stylesFactory<IFocusRingStylesFactory>({
  classNames,
  tokensClassName,
  tokens,
});
