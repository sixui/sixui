import { layer, style } from '@vanilla-extract/css';

import { Avatar } from '~/components/Avatar';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';

const base = layer();

export const storyWrapper = style({
  position: 'relative',
  padding: 96,
  backgroundColor: themeTokens.colorScheme.surfaceContainerLowest,
  backgroundImage: `radial-gradient(${themeTokens.colorScheme.outlineVariant} max(0.5px, ${px(0.5)}), transparent 0)`,
  backgroundSize: `${px(10)} ${px(10)}`,
});

// FIXME: delete
export const avatarTheme = style({
  vars: {
    // [PaperBase.theme.tokens.container.opacity.normal]: '0.5',
  },
});

// FIXME: delete
export const buttonTheme = style({
  vars: {
    // This should be defined in a specific user theme css layer. The problem is
    // that vanilla-extract-css does not support `@layer` in `createTheme`.
    // https://github.com/vanilla-extract-css/vanilla-extract/discussions/1472
    // So the app theme would not apply.
    // [PaperBase.theme.tokens.container.color.normal]: 'red',
  },
});

// FIXME: delete
export const testBorder = style({
  border: '1px solid green',
});
