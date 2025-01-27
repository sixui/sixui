import { style } from '@vanilla-extract/css';

import { themeTokens } from '~/components/ThemeProvider';
import { px } from '~/helpers/styles/px';

export const classNames = {
  storyWrapper: style({
    position: 'relative',
    padding: 96,
    backgroundColor: themeTokens.colorScheme.surfaceContainerLowest,
    backgroundImage: `radial-gradient(${themeTokens.colorScheme.outlineVariant} max(0.5px, ${px(0.5)}), transparent 0)`,
    backgroundSize: `${px(10)} ${px(10)}`,
  }),
};
