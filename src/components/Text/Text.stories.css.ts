import { style } from '@vanilla-extract/css';

import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { themeTokens } from '../ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';

const classNames = {
  container: style({
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: themeTokens.colorScheme.outline,
    padding: px(space(4)),
    selectors: {
      [getModifierSelector('size="sm"')]: {
        maxWidth: px(150),
      },
      [getModifierSelector('size="md"')]: {
        maxWidth: px(300),
      },
      [getModifierSelector('size="lg"')]: {
        maxWidth: px(600),
      },
    },
  }),
  truncatedContainer: style({
    maxWidth: px(1200),
  }),
};

export const textStoriesStyles = {
  classNames,
};
