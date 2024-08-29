import { createTheme, style } from '@vanilla-extract/css';

import {
  componentStylesFactory,
  type IComponentStylesFactory,
} from '~/utils/componentStylesFactory';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { space } from '~/helpers/styles/space';
import { px } from '~/helpers/styles/px';
import { themeTokens } from '../ThemeProvider';

const [tokensClassName, tokens] = createTheme({
  legendText: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    typography: themeTokens.typeScale.label.md,
  },

  outline: {
    color: themeTokens.colorScheme.onSurface,
  },
});

const root = style({});

const classNames = {
  root,
  flex: style({
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '100%',
  }),
  justifyStart: style({
    justifyContent: 'flex-start',
  }),
  justifyEnd: style({
    justifyContent: 'flex-end',
  }),
  align$start: style({
    alignItems: 'start',
  }),
  align$center: style({
    alignItems: 'center',
  }),
  align$end: style({
    alignItems: 'end',
  }),
  align$stretch: style({
    alignItems: 'stretch',
  }),
  textRight: style({
    textAlign: 'right',
  }),
  groupRows: style({
    display: 'flex',
    flexDirection: 'column',
    gap: px(space(8, 'lg')),
    alignSelf: 'stretch',
  }),
  cols: style({
    display: 'flex',
  }),
  gap$md: style({
    gap: px(space(4, 'lg')),
  }),
  gap$lg: style({
    gap: px(space(5, 'lg')),
  }),
  rows: style({
    display: 'flex',
    flexDirection: 'column',
  }),
  legendText: style({
    color: tokens.legendText.color,
    ...getTypographyStyles(tokens.legendText.typography),
  }),
  legendRow: style({
    display: 'flex',
    alignItems: 'center',
    maxWidth: px(120),
  }),
  leftBorder: style({
    borderLeftWidth: themeTokens.outline.width.xs,
    borderLeftStyle: 'solid',
    borderLeftColor: tokens.outline.color,
    paddingLeft: px(space(4, 'lg')),
  }),
  invisible: style({
    visibility: 'hidden',
  }),
  w100: style({
    width: '100%',
  }),
};

export type IComponentShowcaseStylesFactory = IComponentStylesFactory<{
  styleName: keyof typeof classNames;
  tokens: object;
}>;

export const componentShowcaseStyles =
  componentStylesFactory<IComponentShowcaseStylesFactory>({
    classNames,
    tokensClassName: tokensClassName,
    tokens,
  });
