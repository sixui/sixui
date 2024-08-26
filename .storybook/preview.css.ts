import { style } from '@vanilla-extract/css';

import { colorSchemeTokens } from '~/components/ColorScheme';

export const storyWrapper = style({
  position: 'relative',
  backgroundColor: colorSchemeTokens.surface,
  // FIXME:
  // padding: spacingTokens.padding$6,
  width: '100%',
});
