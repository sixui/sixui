import { style } from '@vanilla-extract/css';

import { px } from '~/helpers/styles/px';
import { themeTokens } from '../ThemeProvider';
import { colorSchemeTokens } from '../ColorScheme';

export const container = style({
  position: 'relative',
  boxSizing: 'content-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: px(96),
  height: px(96),
  outlineWidth: themeTokens.outline.width.xs,
  outlineColor: colorSchemeTokens.outline,
});

export const container$inner = style({
  position: 'absolute',
  width: px(48),
  height: px(48),
  borderRadius: px(themeTokens.shape.corner.lg),
  outlineStyle: 'solid',
  inset: '50%',
  transform: 'translate(-50%, -50%)',
});

export const container$bounded = style({
  borderRadius: px(themeTokens.shape.corner.xl),
  outlineStyle: 'solid',
});

export const container$unbounded = style({
  borderRadius: '50%',
  outlineStyle: 'dashed',
});

export const overlappingContainer = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
});

export const anchor = style({
  borderRadius: '50%',
  position: 'relative',
  display: 'flex',
  width: px(24),
  height: px(24),
  placeContent: 'center',
  placeItems: 'center',
  backgroundColor: colorSchemeTokens.primaryContainer,
  borderWidth: themeTokens.outline.width.xs,
  borderStyle: 'solid',
  borderColor: colorSchemeTokens.outline,
});
