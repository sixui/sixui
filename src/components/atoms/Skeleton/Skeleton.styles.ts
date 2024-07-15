import stylex from '@stylexjs/stylex';

import { skeletonTokens } from './Skeleton.stylex';
import { shapeTokens } from '@/themes/base/tokens/shape.stylex';

const pulseKeyframe = stylex.keyframes({
  '0%': {
    opacity: skeletonTokens.animationMaxOpacity$pulse,
  },
  '50%': {
    opacity: 0,
  },
  '100%': {
    opacity: skeletonTokens.animationMaxOpacity$pulse,
  },
});

const waveKeyframe = stylex.keyframes({
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

export type ISkeletonStylesKey = keyof typeof skeletonStyles;
export const skeletonStyles = stylex.create({
  host: {
    display: 'block',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'default',
    color: 'transparent',
    zIndex: skeletonTokens.zIndex,

    '::before': {
      content: '',
      display: 'block',
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      zIndex: skeletonTokens.zIndex,
      backgroundColor: skeletonTokens.containerColor,
    },

    '::after': {
      content: '',
      display: 'block',
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      zIndex: skeletonTokens.zIndex,
    },
  },
  host$error: {
    '::before': {
      backgroundColor: skeletonTokens.containerColor$error,
    },
  },
  host$rectangular: {
    height: 'auto',
    borderRadius: skeletonTokens.containerShape,
  },
  host$circular: {
    borderRadius: shapeTokens.corner$full,
    flexGrow: 0,
    flexShrink: 0,
  },
  host$overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  hidden: {
    visibility: 'hidden',
  },
  animation$pulse: {
    '::after': {
      opacity: skeletonTokens.animationMaxOpacity$pulse,
      animationName: pulseKeyframe,
      animationDuration: skeletonTokens.animationDuration$pulse,
      animationDelay: skeletonTokens.animationDelay$pulse,
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
      backgroundColor: skeletonTokens.animationTargetColor,
    },
  },
  animation$wave: {
    '::after': {
      opacity: skeletonTokens.animationMaxOpacity$wave,
      animationName: waveKeyframe,
      animationDuration: skeletonTokens.animationDuration$wave,
      animationDelay: skeletonTokens.animationDelay$wave,
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
      background: `linear-gradient(90deg, transparent, ${skeletonTokens.animationTargetColor}, transparent)`,

      transform: 'translateX(-100%)',
      inset: 0,
    },
  },
});
