import { style } from '@vanilla-extract/css';

import { themeTokens } from '~/components/ThemeProvider';
import { Avatar } from '~/components/Avatar';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';

export const storyWrapper = style({
  position: 'relative',
  backgroundColor: themeTokens.colorScheme.surface,
  padding: 48,
});

// FIXME: delete
export const testVariant = style({
  // border: '4px solid green',
  selectors: {
    [getModifierSelector('variant="icon"')]: {
      vars: {
        [Avatar.theme.tokens.container.color]: 'green',
      },
      // border: '4px solid purple',
    },
  },
});

// FIXME: delete
export const testBorder = style({
  border: '1px solid green',
});
