import { createTheme, style } from '@vanilla-extract/css';

import { px } from '~/helpers/styles/px';
import { themeTokens } from '../ThemeProvider';
import { colorSchemeTokens } from '../ColorScheme';

export const [stateLayerStoriesTheme, stateLayerStoriesTokens] = createTheme({
  container: {
    size: {
      sm: '48px',
      md: '96px',
      lg: '192px',
    },
    shape: themeTokens.shape.corner.full,
  },
});

const container = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: px(stateLayerStoriesTokens.container.size.md),
  height: px(stateLayerStoriesTokens.container.size.md),
  borderRadius: px(stateLayerStoriesTokens.container.shape),
  outlineWidth: themeTokens.outline.width.xs,
  outlineColor: colorSchemeTokens.outline,
  outlineStyle: 'solid',
  backgroundColor: colorSchemeTokens.surface,
});

export const stateLayerStoriesStyles = {
  container,
  container$lg: style({
    width: px(stateLayerStoriesTokens.container.size.lg),
    height: px(stateLayerStoriesTokens.container.size.lg),
  }),
  container$sm: style({
    width: px(stateLayerStoriesTokens.container.size.sm),
    height: px(stateLayerStoriesTokens.container.size.sm),
  }),
  container$nested: style({
    position: 'absolute',
    borderRadius: px(stateLayerStoriesTokens.container.shape),
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
