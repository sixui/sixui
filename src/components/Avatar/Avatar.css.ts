import {
  createTheme,
  createVar,
  style,
  styleVariants,
} from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { getDensity } from '~/helpers/styles/getDensity';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { themeTokens } from '../ThemeProvider';
import { colorSchemeTokens } from '../ColorScheme';

export type IAvatarVariant = 'rounded' | 'squared';
export type IAvatarClassName = keyof typeof avatarStyles;

export const [avatarTheme, avatarTokens] = createTheme({
  density: getDensity({ min: -3, max: 0 }),
  container: {
    size: '40px',
    shape: themeTokens.shape.corner.full,
    color: colorSchemeTokens.primaryContainer,
  },
  labelText: {
    color: colorSchemeTokens.onPrimaryContainer,
    typography: themeTokens.typeScale.title.md,
  },
});

const localTokens = {
  size: createVar(),
  shape: createVar(),
};

const root = style({
  vars: {
    [localTokens.size]: calc.add(
      px(avatarTokens.container.size),
      avatarTokens.density,
    ),
    [localTokens.shape]: px(avatarTokens.container.shape),
  },
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: localTokens.size,
  height: localTokens.size,
  overflow: 'hidden',
  borderRadius: localTokens.shape,
  userSelect: 'none',
  backgroundColor: avatarTokens.container.color,
});

export const avatarStyles = {
  root,
  image: style({
    width: '100%',
    height: '100%',
    textAlign: 'center',
    objectFit: 'cover',
    // Hide alt text.
    color: 'transparent',
    // Hide the image broken icon, only works on Chrome.
    textIndent: 10000,
  }),
  placeholder: style({
    width: '70%',
    height: '70%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    textTransform: 'uppercase',
    color: avatarTokens.labelText.color,
    ...getTypographyStyles(avatarTokens.labelText.typography),
    selectors: {
      [getModifierSelector('hovered', root)]: {
        backgroundColor: 'red',
        border: '2px solid red',
      },
    },
  }),
};

// TODO: delete variants?
export const avatarVariants: Partial<
  Record<IAvatarClassName, Partial<Record<IAvatarVariant, string>>>
> = {
  root: styleVariants({
    rounded: {
      vars: {
        [localTokens.shape]: themeTokens.shape.corner.full,
      },
    },
    squared: {
      vars: {
        [localTokens.shape]: themeTokens.shape.corner.sm,
      },
    },
  }),
};
