import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { cssLayers, themeTokens } from '../ThemeProvider';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  legendText: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    typography: themeTokens.typeScale.label.md,
  },

  outline: {
    color: themeTokens.colorScheme.onSurface,
  },
});

const classNames = createStyles({
  flex: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '100%',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  align$start: {
    alignItems: 'start',
  },
  align$center: {
    alignItems: 'center',
  },
  align$end: {
    alignItems: 'end',
  },
  align$stretch: {
    alignItems: 'stretch',
  },
  textRight: {
    textAlign: 'right',
  },
  groupRows: {
    display: 'flex',
    flexDirection: 'column',
    gap: px(space(16)),
    alignSelf: 'stretch',
  },
  cols: {
    display: 'flex',
  },
  gap$md: {
    gap: px(space(8)),
  },
  gap$lg: {
    gap: px(space(10)),
  },
  rows: {
    display: 'flex',
    flexDirection: 'column',
  },
  legendText: {
    color: tokens.legendText.color,
    ...getTypographyStyles(tokens.legendText.typography),
  },
  legendRow: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: px(120),
  },
  leftBorder: {
    borderLeftWidth: px(themeTokens.outline.width.xs),
    borderLeftStyle: 'solid',
    borderLeftColor: tokens.outline.color,
    paddingLeft: px(space(8)),
  },
  invisible: {
    visibility: 'hidden',
  },
  w100: {
    width: '100%',
  },
});

export type IComponentShowcaseThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const componentShowcaseTheme =
  componentThemeFactory<IComponentShowcaseThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
