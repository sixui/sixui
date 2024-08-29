import { createTheme, style } from '@vanilla-extract/css';

import { px } from '~/helpers/styles/px';
import { themeTokens } from '../ThemeProvider';

const [tokensClassName, tokens] = createTheme({
  container: {
    size: {
      sm: '48px',
      md: '96px',
      lg: '192px',
    },
    shape: themeTokens.shape.corner.full,
  },
});

const classNames = {
  container: style({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: px(tokens.container.size.md),
    height: px(tokens.container.size.md),
    borderRadius: px(tokens.container.shape),
    outlineWidth: themeTokens.outline.width.xs,
    outlineColor: themeTokens.colorScheme.outline,
    outlineStyle: 'solid',
    backgroundColor: themeTokens.colorScheme.surface,
  }),
  container$lg: style({
    width: px(tokens.container.size.lg),
    height: px(tokens.container.size.lg),
  }),
  container$sm: style({
    width: px(tokens.container.size.sm),
    height: px(tokens.container.size.sm),
  }),
  container$nested: style({
    position: 'absolute',
    borderRadius: px(tokens.container.shape),
    outlineStyle: 'solid',
    inset: '50%',
    transform: 'translate(-50%, -50%)',
  }),
  container$bounded: style({
    outlineStyle: 'solid',
  }),
  container$unbounded: style({
    outlineStyle: 'dashed',
  }),
};

export const stateLayerStoriesStyles = {
  classNames,
  tokensClassName,
  tokens,
};
