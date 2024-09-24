import { style } from '@vanilla-extract/css';

import { Avatar } from '~/components/Avatar';
import { themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';

export const storyWrapper = style({
  position: 'relative',
  padding: 96,
  backgroundColor: themeTokens.colorScheme.surfaceContainerLowest,
  backgroundImage: `radial-gradient(${themeTokens.colorScheme.outlineVariant} max(0.5px, ${px(0.5)}), transparent 0)`,
  backgroundSize: `${px(10)} ${px(10)}`,
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
