import { keyframes } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { ISkeletonVariant } from './Skeleton.types';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';
import { createTokensVars } from '~/utils/styles/createTokensVars';

type IModifier = 'animation';

const [tokensClassName, tokens] = createTheme({
  width: 'unset',
  container: {
    color: themeTokens.colorScheme.surfaceContainerHigh,
    shape: `min(0.25em, ${px(themeTokens.shape.corner.xs)})`,
  },
  animation: {
    targetColor: themeTokens.colorScheme.inverseSurface,
    duration: '2s',
    delay: '0.5s',
  },
  animation$pulse: {
    maxOpacity: '0.12',
  },
  animation$wave: {
    maxOpacity: '0.08',
  },
});

const pulseKeyframes = keyframes({
  '0%': {
    opacity: 0,
  },
  '50%': {
    opacity: tokens.animation$pulse.maxOpacity,
  },
  '100%': {
    opacity: 0,
  },
});

const waveKeyframes = keyframes({
  '0%': {
    transform: 'translateX(-100%)',
  },
  '50%': {
    transform: 'translateX(100%)',
  },
  '100%': {
    transform: 'translateX(100%)',
  },
});

const classNames = createStyles({
  root: {
    display: 'block',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'default',
    color: 'transparent',
    width: tokens.width,

    '::before': {
      content: '',
      display: 'block',
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      backgroundColor: tokens.container.color,
    },

    '::after': {
      content: '',
      display: 'block',
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
    },

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
      },
    }),

    selectors: {
      [`${getModifierSelector<IModifier>({ animation: 'pulse' })}::after`]: {
        opacity: 0,
        animationName: pulseKeyframes,
        animationDuration: tokens.animation.duration,
        animationDelay: tokens.animation.delay,
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        backgroundColor: tokens.animation.targetColor,
      },
      [`${getModifierSelector<IModifier>({ animation: 'wave' })}::after`]: {
        opacity: tokens.animation$wave.maxOpacity,
        animationName: waveKeyframes,
        animationDuration: tokens.animation.duration,
        animationDelay: tokens.animation.delay,
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        background: `linear-gradient(90deg, transparent, ${tokens.animation.targetColor}, transparent)`,
        transform: 'translateX(-100%)',
        inset: 0,
      },
    },
  },
  content: {
    visibility: 'hidden',
  },
});

export type ISkeletonThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
  variant: ISkeletonVariant;
}>;

export const skeletonTheme = componentThemeFactory<ISkeletonThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});

export const skeletonThemeVariants = {
  rectangular: createStyles({
    root: {
      height: 'auto',

      vars: createTokensVars(PaperBase.theme.tokens, {
        container: {
          shape: tokens.container.shape,
        },
      }),
    },
  }),

  circular: createStyles({
    root: {
      flexGrow: 0,
      flexShrink: 0,

      vars: createTokensVars(PaperBase.theme.tokens, {
        container: {
          shape: px(themeTokens.shape.corner.circle),
        },
      }),
    },
  }),

  overlay: createStyles({
    root: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
  }),
};
