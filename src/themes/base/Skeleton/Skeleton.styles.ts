import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ISkeletonStyleKey } from '@/components/atoms/Skeleton';
import { componentVars as vars } from './Skeleton.stylex';
import { shapeVars } from '../vars/shape.stylex';

const pulseKeyframe = stylex.keyframes({
  '0%': {
    opacity: vars.animationMaxOpacity$pulse,
  },
  '50%': {
    opacity: 0,
  },
  '100%': {
    opacity: vars.animationMaxOpacity$pulse,
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

type ISkeletonStyles = IStyles<ISkeletonStyleKey>;
export const styles: MapNamespaces<ISkeletonStyles> =
  stylex.create<ISkeletonStyles>({
    host: {
      display: 'block',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'default',
      color: 'transparent',
      zIndex: vars.zIndex,

      '::before': {
        content: '',
        display: 'block',
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        zIndex: vars.zIndex,
        backgroundColor: vars.containerColor,
      },

      '::after': {
        content: '',
        display: 'block',
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        zIndex: vars.zIndex,
      },
    },
    host$error: {
      '::before': {
        backgroundColor: vars.containerColor$error,
      },
    },
    host$rectangular: {
      height: 'auto',
      borderRadius: vars.containerShape,
    },
    host$circular: {
      borderRadius: shapeVars.corner$full,
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
        opacity: vars.animationMaxOpacity$pulse,
        animationName: pulseKeyframe,
        animationDuration: vars.animationDuration$pulse,
        animationDelay: vars.animationDelay$pulse,
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        backgroundColor: vars.animationTargetColor,
      },
    },
    animation$wave: {
      '::after': {
        opacity: vars.animationMaxOpacity$wave,
        animationName: waveKeyframe,
        animationDuration: vars.animationDuration$wave,
        animationDelay: vars.animationDelay$wave,
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        background: `linear-gradient(90deg, transparent, ${vars.animationTargetColor}, transparent)`,

        transform: 'translateX(-100%)',
        inset: 0,
      },
    },
  });
