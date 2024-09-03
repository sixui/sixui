import { keyframes } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import {
  stylesFactory,
  type IStylesFactory,
} from '~/utils/styles/stylesFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { circularProgressIndicatorStyles } from '../CircularProgressIndicator/CircularProgressIndicator.css';
import { px } from '~/helpers/styles/px';

type IModifier = 'disabled';

const parentStyles = circularProgressIndicatorStyles;

// Note, these value come from the m2 version but match current gm3 values.
// Constants:
//       ARCSIZE     = 270 degrees (amount of circle the arc takes up)
//       ARCTIME     = 1333ms (time it takes to expand and contract arc)
//       ARCSTARTROT = 216 degrees (how much the start location of the arc
//                                 should rotate each time, 216 gives us a
//                                 5 pointed star shape (it's 360/5 * 3).
//                                 For a 7 pointed star, we might do
//                                 360/7 * 3 = 154.286)
// ARCTIME
const arcDuration = '1333ms';
// 4 * ARCTIME
const cycleDuration = `calc(4 * ${arcDuration})`;
// ARCTIME * 360 / (ARCSTARTROT + (360-ARCSIZE))
const linearRotateDuration = `calc(${arcDuration} * 360 / 306)`;

const indeterminateEasing = 'cubic-bezier(0.4, 0, 0.2, 1)';

// Indeterminate mode is 3 animations composed together:
// 1. expandArc: an arc is expanded/contracted between 10deg and 270deg.
// 2. rotateArc: at the same time, the arc is rotated in increments
// of 270deg.
// 3. linearRotate: that rotating arc is then linearly rotated to produce
// a spinning expanding/contracting arc.
//
// See original implementation:
// https://github.com/PolymerElements/paper-spinner/blob/master/paper-spinner-styles.js.

// 1. expandArc
// This is used on 2 divs which each represent half the desired
// 270deg arc with one offset by 50%. This creates an arc which expands from
// 10deg to 270deg.
const expandArcKeyframes = keyframes({
  '0%': { transform: 'rotate(265deg)' },
  '50%': { transform: 'rotate(130deg)' },
  '100%': { transform: 'rotate(265deg)' },
});

// 2. rotateArc
// The arc seamlessly travels around the circle indefinitely so it needs to
// end at a full rotation of the circle. This rotates the 270 deg
// (270/360 = 3/4) arc 4x (4 * 3/4 = 3) so it ends at
// (3 * 360 = 1080).
// This is sub-divided into increments of 135deg since the arc is rendered
// with 2 divs acting together.
const rotateArcKeyframes = keyframes({
  '12.5%': { transform: 'rotate(135deg)' },
  '25%': { transform: 'rotate(270deg)' },
  '37.5%': { transform: 'rotate(405deg)' },
  '50%': { transform: 'rotate(540deg)' },
  '62.5%': { transform: 'rotate(675deg)' },
  '75%': { transform: 'rotate(810deg)' },
  '87.5%': { transform: 'rotate(945deg)' },
  '100%': { transform: 'rotate(1080deg)' },
});

// 3. linearRotate
// The traveling expanding arc is linearly rotated to produce the spinner
// effect.
const linearRotateKeyframes = keyframes({
  '100%': { transform: 'rotate(360deg)' },
});

const classNames = createStyles({
  root: {},
  progress: {
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationName: linearRotateKeyframes,
    animationDuration: linearRotateDuration,
  },
  spinner: {
    animationIterationCount: 'infinite',
    animationFillMode: 'both',
    animationName: rotateArcKeyframes,
    animationDuration: cycleDuration,
    animationTimingFunction: indeterminateEasing,
  },
  left: {
    overflow: 'hidden',
    inset: '0 50% 0 0',
  },
  right: {
    overflow: 'hidden',
    inset: '0 0 0 50%',
  },
  circle: ({ root }) => ({
    borderRadius: '50%',
    // Match size to svg stroke width, which is a fraction of the overall
    // padding box width.
    borderStyle: 'solid',
    borderTopColor: 'inherit',
    borderRightColor: 'inherit',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    animationName: expandArcKeyframes,
    animationIterationCount: 'infinite',
    animationFillMode: 'both',
    animationDuration: `${arcDuration}, ${cycleDuration}`,
    animationTimingFunction: indeterminateEasing,
    borderWidth: px(
      calc.multiply('1em', calc.divide(parentStyles.tokens.strokePct, '100')),
    ),

    selectors: {
      [getModifierSelector<IModifier>('disabled', root)]: {
        borderTopColor: parentStyles.tokens.color.disabled,
        borderRightColor: parentStyles.tokens.color.disabled,
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        opacity: parentStyles.tokens.opacity.disabled,
      },
    },
  }),
  circle$left: {
    rotate: '135deg',
    inset: '0 -100% 0 0',
  },
  circle$right: {
    rotate: '100deg',
    inset: '0 0 0 -100%',
    animationDelay: `calc(-0.5 * ${arcDuration}), 0ms`,
  },
});

export type IIndeterminateCircularProgressIndicatorStylesFactory =
  IStylesFactory<{
    styleName: keyof typeof parentStyles.classNames | keyof typeof classNames;
    tokens: typeof parentStyles.tokens;
    modifier: IModifier;
  }>;

export const indeterminateCircularProgressIndicatorStyles =
  stylesFactory<IIndeterminateCircularProgressIndicatorStylesFactory>({
    classNames: mergeClassNames(parentStyles.classNames, classNames),
    tokensClassName: parentStyles.tokensClassName,
    tokens: parentStyles.tokens,
  });