import { keyframes } from '@vanilla-extract/css';
import cx from 'clsx';

import type { ILinearProgressIndicatorModifier } from '~/components/LinearProgressIndicator/LinearProgressIndicator.css';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { mergeClassNames, modifierSelector } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { deepMerge } from '~/utils/deepMerge';
import { linearProgressIndicatorTheme } from '~/components/LinearProgressIndicator/LinearProgressIndicator.css';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './IndeterminateLinearProgressIndicator.constants';

type IModifier = ILinearProgressIndicatorModifier;

const parentStyles = linearProgressIndicatorTheme;

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  animationDuration: '2s',
});

const primaryIndeterminateScaleKeyframes = keyframes({
  '0%': {
    transform: 'scaleX(0.08)',
  },
  '36.65%': {
    animationTimingFunction: 'cubic-bezier(0.334731, 0.12482, 0.785844, 1)',
    transform: 'scaleX(0.08)',
  },
  '69.15%': {
    animationTimingFunction: 'cubic-bezier(0.06, 0.11, 0.6, 1)',
    transform: 'scaleX(0.661479)',
  },
  '100%': {
    transform: 'scaleX(0.08)',
  },
});

const secondaryIndeterminateScaleKeyframes = keyframes({
  '0%': {
    animationTimingFunction:
      'cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971)',
    transform: 'scaleX(0.08)',
  },
  '19.15%': {
    animationTimingFunction:
      'cubic-bezier(0.152313, 0.196432, 0.648374, 1.00432)',
    transform: 'scaleX(0.457104)',
  },
  '44.15%': {
    animationTimingFunction:
      'cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179)',
    transform: 'scaleX(0.72796)',
  },
  '100%': {
    transform: 'scaleX(0.08)',
  },
});

const primaryIndeterminateTranslateKeyframes = keyframes({
  '0%': {
    transform: 'translateX(0px)',
  },
  '20%': {
    animationTimingFunction: 'cubic-bezier(0.5, 0, 0.701732, 0.495819)',
    transform: 'translateX(0px)',
  },
  '59.15%': {
    animationTimingFunction: 'cubic-bezier(0.302435, 0.381352, 0.55, 0.956352)',
    transform: 'translateX(83.6714%)',
  },
  '100%': {
    transform: 'translateX(200.611%)',
  },
});

const secondaryIndeterminateTranslateKeyframes = keyframes({
  '0%': {
    animationTimingFunction: 'cubic-bezier(0.15, 0, 0.515058, 0.409685)',
    transform: 'translateX(0px)',
  },
  '25%': {
    animationTimingFunction: 'cubic-bezier(0.31033, 0.284058, 0.8, 0.733712)',
    transform: 'translateX(37.6519%)',
  },
  '48.35%': {
    animationTimingFunction: 'cubic-bezier(0.4, 0.627035, 0.6, 0.902026)',
    transform: 'translateX(84.3862%)',
  },
  '100%': {
    transform: 'translateX(160.278%)',
  },
});

const classNames = createStyles({
  root: {
    contentVisibility: 'auto',
    contain: 'strict',
  },
  inactiveTrack: {
    position: 'absolute',
    inset: 0,

    transitionProperty: 'transform',
    transitionDuration: themeTokens.motion.duration.short4,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.accelerate,
  },
  bar: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    transformOrigin: 'left center',
    borderRadius: 'inherit',

    transitionProperty: 'transform',
    transitionDuration: themeTokens.motion.duration.short4,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.accelerate,
  },
  barInner: ({ root }) => ({
    position: 'absolute',
    inset: '0',
    background: parentStyles.tokens.activeIndicator.color.normal,

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        background: parentStyles.tokens.activeIndicator.color.disabled,
        opacity: parentStyles.tokens.activeIndicator.opacity.disabled,
      },
    },
  }),
  primaryBar: {
    insetInlineStart: '-145.167%',

    animationName: primaryIndeterminateTranslateKeyframes,
    animationDuration: tokens.animationDuration,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
  primaryBarInner: {
    animationName: primaryIndeterminateScaleKeyframes,
    animationDuration: tokens.animationDuration,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
  secondaryBar: {
    insetInlineStart: '-54.8889%',

    animationName: secondaryIndeterminateTranslateKeyframes,
    animationDuration: tokens.animationDuration,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
  secondaryBarInner: {
    animationName: secondaryIndeterminateScaleKeyframes,
    animationDuration: tokens.animationDuration,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
});

export type IIndeterminateLinearProgressIndicatorThemeFactory =
  IComponentThemeFactory<{
    styleName: keyof typeof parentStyles.classNames | keyof typeof classNames;
    tokens: typeof parentStyles.tokens & typeof tokens;
    modifier: IModifier;
  }>;

export const indeterminateLinearProgressIndicatorTheme =
  componentThemeFactory<IIndeterminateLinearProgressIndicatorThemeFactory>({
    classNames: mergeClassNames(parentStyles.classNames, classNames),
    tokensClassName: cx(parentStyles.tokensClassName, tokensClassName),
    tokens: deepMerge(
      parentStyles.tokens,
      tokens,
    ) as typeof parentStyles.tokens & typeof tokens,
  });
