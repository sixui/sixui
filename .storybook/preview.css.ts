import { style } from '@vanilla-extract/css';

import { themeTokens } from '~/components/ThemeProvider';

export const storyWrapper = style({
  position: 'relative',
  backgroundColor: themeTokens.colorScheme.surface,
  padding: 80,
  // FIXME:
  // padding: spacingTokens.padding$6,
  width: '100%',
});
