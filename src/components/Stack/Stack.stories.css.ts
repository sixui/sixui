import { createTheme, style } from '@vanilla-extract/css';

import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { themeTokens } from '../ThemeProvider';
import { colorSchemeTokens } from '../ColorScheme';

export const [stackTheme, stackTokens] = createTheme({
  //
});

const root = style({
  borderWidth: themeTokens.outline.width.xs,
  borderStyle: 'dashed',
  borderColor: colorSchemeTokens.outlineVariant,

  height: px(400),
  width: px(128),
});

export const stackStyles = {
  root,
  placeholder: style({
    width: px(64),
    paddingInline: px(space(1)),
  }),
  placeholder$sm: style({
    paddingBlock: px(space(1)),
  }),
  placeholder$md: style({
    paddingBlock: px(space(4)),
  }),
  placeholder$lg: style({
    paddingBlock: px(space(6)),
  }),
};
