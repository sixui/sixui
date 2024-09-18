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
    color: themeTokens.colorScheme.error,
    shape: {
      normal: px(themeTokens.shape.corner.full),
      dot: px(themeTokens.shape.corner.full),
    },
    minSize: px(16),
    dotScale: '0.5', // 8px
  },
  label: {
    color: themeTokens.colorScheme.onError,
    typography: themeTokens.typeScale.label.sm,
  },
});

const classNames = createStyles({
  root: {
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    borderRadius: tokens.container.shape.normal,
    minWidth: tokens.container.minSize,
    height: tokens.container.minSize,
    padding: px(space(1)),
    transitionProperty: 'transform',
    transitionDuration: themeTokens.motion.duration.short.$3,
    transitionTimingFunction: themeTokens.motion.easing.standard.normal,
    whiteSpace: 'nowrap',
  },
  root$dot: {
    borderRadius: tokens.container.shape.dot,
    transform: `scale(${tokens.container.dotScale})`,
    padding: 0,
  },
  root$invisible: {
    transform: 'scale(0)',
  },
  background: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    backgroundColor: tokens.container.color,
  },
  label: {
    position: 'relative',
    color: tokens.label.color,
    ...getTypographyStyles(tokens.label.typography),
  },
});

export type IBadgeThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const badgeTheme = componentThemeFactory<IBadgeThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
