import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IAnchoredStyleKey } from '@/components/utils/Anchored';
import { motionVars } from '../vars/motion.stylex';

type IAnchoredStyles = IStyles<IAnchoredStyleKey>;
export const styles: MapNamespaces<IAnchoredStyles> =
  stylex.create<IAnchoredStyles>({
    host: {
      position: 'relative',
      display: 'inline-flex',
      verticalAlign: 'middle',
    },
    content: {
      position: 'absolute',
      display: 'flex',
      transitionProperty: 'transform',
      transitionDuration: motionVars.duration$short3,
      transitionTimingFunction: motionVars.easing$emphasized,
    },
    content$rectangular$top$right: {
      top: 0,
      right: 0,
      transform: 'scale(1) translate(50%, -50%)',
      transformOrigin: '100% 0%',
    },
    content$rectangular$top$right$invisible: {
      transform: 'scale(0) translate(50%, -50%)',
    },
    content$rectangular$bottom$right: {
      bottom: 0,
      right: 0,
      transform: 'scale(1) translate(50%, 50%)',
      transformOrigin: '100% 100%',
    },
    content$rectangular$bottom$right$invisible: {
      transform: 'scale(0) translate(50%, 50%)',
    },
    content$rectangular$top$left: {
      top: 0,
      left: 0,
      transform: 'scale(1) translate(-50%, -50%)',
      transformOrigin: '0% 0%',
    },
    content$rectangular$top$left$invisible: {
      transform: 'scale(0) translate(-50%, -50%)',
    },
    content$rectangular$bottom$left: {
      bottom: 0,
      left: 0,
      transform: 'scale(1) translate(-50%, 50%)',
      transformOrigin: '0% 100%',
    },
    content$rectangular$bottom$left$invisible: {
      transform: 'scale(0) translate(-50%, 50%)',
    },
    content$circular$top$right: {
      top: '14%',
      right: '14%',
      transform: 'scale(1) translate(50%, -50%)',
      transformOrigin: '100% 0%',
    },
    content$circular$top$right$invisible: {
      transform: 'scale(0) translate(50%, -50%)',
    },
    content$circular$bottom$right: {
      bottom: '14%',
      right: '14%',
      transform: 'scale(1) translate(50%, 50%)',
      transformOrigin: '100% 100%',
    },
    content$circular$bottom$right$invisible: {
      transform: 'scale(0) translate(50%, 50%)',
    },
    content$circular$top$left: {
      top: '14%',
      left: '14%',
      transform: 'scale(1) translate(-50%, -50%)',
      transformOrigin: '0% 0%',
    },
    content$circular$top$left$invisible: {
      transform: 'scale(0) translate(-50%, -50%)',
    },
    content$circular$bottom$left: {
      bottom: '14%',
      left: '14%',
      transform: 'scale(1) translate(-50%, 50%)',
      transformOrigin: '0% 100%',
    },
    content$circular$bottom$left$invisible: {
      transform: 'scale(0) translate(-50%, 50%)',
    },
  });
