import { style } from '@vanilla-extract/css';

import { themeTokens } from '~/components/Theme';
import { px } from '~/utils/css/px';

export const classNames = {
  wrapper: style({
    width: '100%',

    '@media': {
      '(prefers-color-scheme: dark)': {
        // flexDirection: 'column-reverse',
      },
    },
  }),
  storyWrapper: style({
    position: 'relative',
    padding: 96,
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
  }),
};
