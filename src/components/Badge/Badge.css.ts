import { createTheme, createVar } from '@vanilla-extract/css';

import {
  stylesFactory,
  type IStylesFactory,
} from '~/utils/styles/stylesFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { themeTokens } from '../ThemeProvider';

const [tokensClassName, tokens] = createTheme({
  container: {
    color: themeTokens.colorScheme.error,
    shape: {
      normal: themeTokens.shape.corner.full,
      dot: themeTokens.shape.corner.full,
    },
    minSize: '16px',
    dotScale: '0.5', // 8px
  },
  label: {
    color: themeTokens.colorScheme.onError,
    typography: themeTokens.typeScale.label.sm,
  },
});

const vars = {
  size: createVar(),
  shape: {
    normal: createVar(),
    dot: createVar(),
  },
};

const classNames = createStyles({
  root: {
    vars: {
      [vars.size]: `max(${tokens.container.minSize}, ${px(tokens.container.minSize)})`,
      [vars.shape.normal]: px(tokens.container.shape.normal),
      [vars.shape.dot]: px(tokens.container.shape.dot),
    },
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    borderRadius: vars.shape.normal,
    minWidth: vars.size,
    height: vars.size,
    padding: px(space(1)),
    transitionProperty: 'transform',
    transitionDuration: themeTokens.motion.duration.short.$3,
    transitionTimingFunction: themeTokens.motion.easing.standard.normal,
    whiteSpace: 'nowrap',
  },
  root$dot: {
    borderRadius: vars.shape.dot,
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

export type IBadgeStylesFactory = IStylesFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const badgeStyles = stylesFactory<IBadgeStylesFactory>({
  classNames,
  tokensClassName,
  tokens,
});