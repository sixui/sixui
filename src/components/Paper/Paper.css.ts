import { defineProperties, createRainbowSprinkles } from 'rainbow-sprinkles';

import {
  stylesFactory,
  type IStylesFactory,
} from '~/utils/styles/stylesFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { px } from '~/helpers/styles/px';
import {
  themeTokens,
  type IThemeShapeCornerSize,
  type IThemeOutlineSize,
} from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

export type IPaperStyleName = keyof typeof paperStyles;

const classNames = createStyles({
  root: {},
});

export type IPaperStylesFactory = IStylesFactory<{
  styleName: keyof typeof classNames;
}>;

export const paperStyles = stylesFactory<IPaperStylesFactory>({
  classNames,
  tokens: undefined,
});

const cornerSizes: Array<IThemeShapeCornerSize> = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'full',
] as const;
const cornerVars = cornerSizes.reduce(
  (acc, size) => ({ ...acc, [size]: px(themeTokens.shape.corner[size]) }),
  {} as Record<IThemeShapeCornerSize, string>,
);

const sprinklesProps = defineProperties({
  staticProperties: {
    borderTopLeftRadius: cornerVars,
    borderTopRightRadius: cornerVars,
    borderBottomRightRadius: cornerVars,
    borderBottomLeftRadius: cornerVars,
  },
  shorthands: {
    corner: [
      'borderTopLeftRadius',
      'borderTopRightRadius',
      'borderBottomRightRadius',
      'borderBottomLeftRadius',
    ],
    cornerTop: ['borderTopLeftRadius', 'borderTopRightRadius'],
    cornerBottom: ['borderBottomRightRadius', 'borderBottomLeftRadius'],
    cornerLeft: ['borderTopLeftRadius', 'borderBottomLeftRadius'],
    cornerRight: ['borderTopRightRadius', 'borderBottomRightRadius'],
    cornerTopLeft: ['borderTopLeftRadius'],
    cornerTopRight: ['borderTopRightRadius'],
    cornerBottomLeft: ['borderBottomLeftRadius'],
    cornerBottomRight: ['borderBottomRightRadius'],
  },
});

export const paperSprinkles = createRainbowSprinkles(sprinklesProps);

export type IPaperSprinkles = Parameters<typeof paperSprinkles>[0];

const backgroundSprinklesProps = defineProperties({
  staticProperties: {
    backgroundColor: {
      ...themeTokens.colorScheme,
      transparent: 'transparent',
    },
  },
  shorthands: {
    surface: ['backgroundColor'],
  },
});

export const paperBackgroundSprinkles = createRainbowSprinkles(
  backgroundSprinklesProps,
);

export type IPaperBackgroundSprinkles = Parameters<
  typeof paperBackgroundSprinkles
>[0];

const elevationSprinklesProps = defineProperties({
  staticProperties: {
    boxShadow: elevationLevelPreset,
  },
  shorthands: {
    elevation: ['boxShadow'],
  },
});

export const paperElevationSprinkles = createRainbowSprinkles(
  elevationSprinklesProps,
);

export type IPaperElevationSprinkles = Parameters<
  typeof paperElevationSprinkles
>[0];

const outlineSizes: Array<IThemeOutlineSize> = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
] as const;
const outlineVars = outlineSizes.reduce(
  (acc, size) => ({ ...acc, [size]: px(themeTokens.outline.width[size]) }),
  {} as Record<IThemeOutlineSize, string>,
);

const outlineSprinklesProps = defineProperties({
  dynamicProperties: {
    borderStyle: true,
  },
  staticProperties: {
    borderWidth: outlineVars,
    borderColor: themeTokens.colorScheme,
  },
  shorthands: {
    outline: ['borderWidth'],
    outlineColor: ['borderColor'],
    outlineStyle: ['borderStyle'],
  },
});

export const paperOutlineSprinkles = createRainbowSprinkles(
  outlineSprinklesProps,
);

export type IPaperOutlineSprinkles = Parameters<
  typeof paperOutlineSprinkles
>[0];
