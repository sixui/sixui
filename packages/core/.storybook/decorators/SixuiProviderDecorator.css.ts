import { style } from '@vanilla-extract/css';

import { responsiveContainerQuery } from '~/utils/css';
import { px } from '~/utils/css/px';

export const classNames = {
  root: style({
    padding: px(8),
  }),
  storyWrapper: style({
    background: 'transparent',
    position: 'relative',
    padding: px(96),

    '@media': {
      '(max-width: 600px)': {
        padding: 24,
      },
      '(max-width: 960px)': {
        padding: 48,
      },
      '(max-width: 1280px)': {
        padding: 72,
      },
    },

    '@container': {
      [responsiveContainerQuery({ size: 'compact' })]: {
        padding: px(16),
      },
      [responsiveContainerQuery({ size: 'medium' })]: {
        padding: px(32),
      },
      [responsiveContainerQuery({ size: 'expanded' })]: {
        padding: px(48),
      },
      [responsiveContainerQuery({ size: 'large' })]: {
        padding: px(64),
      },
      [responsiveContainerQuery({ size: 'extraLarge' })]: {
        padding: px(80),
      },
    },
  }),
};
