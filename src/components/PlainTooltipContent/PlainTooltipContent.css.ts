import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { themeTokens } from '../ThemeProvider';

const [tokensClassName, tokens] = createTheme({
  container: {
    color: themeTokens.colorScheme.inverseSurface,
    shape: themeTokens.shape.corner.xs,
    maxWidth: px(215),
    minHeight: px(24),
    topSpace: px(space(2)),
    bottomSpace: px(space(2)),
    leadingSpace: px(space(2)),
    trailingSpace: px(space(2)),
  },
  supportingText: {
    color: themeTokens.colorScheme.inverseOnSurface,
    typography: themeTokens.typeScale.body.sm,
  },
});

const classNames = createStyles({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: 'max-content',
    borderRadius: tokens.container.shape,
    backgroundColor: tokens.container.color,
    paddingTop: tokens.container.topSpace,
    paddingBottom: tokens.container.bottomSpace,
    paddingLeft: tokens.container.leadingSpace,
    paddingRight: tokens.container.trailingSpace,
    maxWidth: tokens.container.maxWidth,
    minHeight: tokens.container.minHeight,
  },
  supportingText: {
    color: tokens.supportingText.color,
    ...getTypographyStyles(tokens.supportingText.typography),
  },
  cursor: {
    fill: tokens.container.color,
  },
});

export type IPlainTooltipContentThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const plainTooltipContentTheme =
  componentThemeFactory<IPlainTooltipContentThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
