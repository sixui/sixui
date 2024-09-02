import { style } from '@vanilla-extract/css';

import { themeTokens } from '~/components/ThemeProvider';
import { Avatar } from '~/components/Avatar';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';

export const storyWrapper = style({
  position: 'relative',
  backgroundColor: themeTokens.colorScheme.surface,
  padding: 80,
  // FIXME:
  // padding: spacingTokens.padding$6,
  width: '100%',
});

// FIXME: delete
export const testVariant = style({
  // border: '4px solid green',
  selectors: {
    [getModifierSelector('variant="icon"')]: {
      vars: {
        [Avatar.styles.tokens.container.color]: 'green',
      },
      // border: '4px solid purple',
    },
  },
});

// FIXME: delete
export const testBorder = style({
  // border: '4px solid green',
});
