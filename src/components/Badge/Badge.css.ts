import { createTheme, createVar, style } from '@vanilla-extract/css';

import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { themeTokens } from '../ThemeProvider';
import { colorSchemeTokens } from '../ColorScheme';
import { space } from '~/helpers/styles/space';

export type IBadgeVariant = 'rounded' | 'squared';
export type IBadgeStyleName = keyof typeof badgeStyles;

export const [badgeTheme, badgeTokens] = createTheme({
  container: {
    color: colorSchemeTokens.error,
    shape: {
      normal: themeTokens.shape.corner.full,
      dot: themeTokens.shape.corner.full,
    },
    minSize: '16px',
    dotScale: '0.5', // 8px
  },
  labelText: {
    color: colorSchemeTokens.onError,
    typography: themeTokens.typeScale.label.sm,
  },
});

const localTokens = {
  size: createVar(),
  shape: {
    normal: createVar(),
    dot: createVar(),
  },
};

export const badgeStyles = {
  root: style({
    vars: {
      [localTokens.size]: `max(${badgeTokens.container.minSize}, ${px(badgeTokens.container.minSize)})`,
      [localTokens.shape.normal]: px(badgeTokens.container.shape.normal),
      [localTokens.shape.dot]: px(badgeTokens.container.shape.dot),
    },
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    borderRadius: localTokens.shape.normal,
    minWidth: localTokens.size,
    height: localTokens.size,
    padding: px(space(1)),
    transitionProperty: 'transform',
    transitionDuration: themeTokens.motion.duration.short.$3,
    transitionTimingFunction: themeTokens.motion.easing.standard.normal,
    whiteSpace: 'nowrap',
  }),
  root$dot: style({
    borderRadius: localTokens.shape.dot,
    transform: `scale(${badgeTokens.container.dotScale})`,
    padding: 0,
  }),
  root$invisible: style({
    transform: 'scale(0)',
  }),
  background: style({
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    backgroundColor: badgeTokens.container.color,
  }),
  label: style({
    position: 'relative',
    color: badgeTokens.labelText.color,
    ...getTypographyStyles(badgeTokens.labelText.typography),
  }),
};
