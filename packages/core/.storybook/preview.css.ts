import { style } from '@vanilla-extract/css';

import { responsiveContainerQuery } from '~/utils/css';
import { px } from '~/utils/css/px';
import { themeTokens } from '~/components/Theme/theme.css';

export const classNames = {
  wrapper: style({
    width: '100%',
  }),
  storyWrapper: style({
    position: 'relative',
    padding: px(96),
    backgroundColor: themeTokens.colorScheme.surfaceContainerLowest,
    backgroundImage: `radial-gradient(${themeTokens.colorScheme.outlineVariant} max(0.5px, ${px(0.5)}), transparent 0)`,
    backgroundSize: `${px(10)} ${px(10)}`,

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
