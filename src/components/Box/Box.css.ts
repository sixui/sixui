import { style } from '@vanilla-extract/css';
import { createRainbowSprinkles, defineProperties } from 'rainbow-sprinkles';

import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getSpacingValues } from '~/helpers/styles/getSpacingValues';
import { cssLayers, themeTokens } from '../ThemeProvider';

type IModifier = 'scale';

export const boxRootClassName = style({
  '@layer': {
    [cssLayers.components]: {
      selectors: {
        [getModifierSelector<IModifier>({ scale: 'xs' })]: {
          vars: {
            [themeTokens.scale]: '0.6',
          },
        },
        [getModifierSelector<IModifier>({ scale: 'sm' })]: {
          vars: {
            [themeTokens.scale]: '0.8',
          },
        },
        [getModifierSelector<IModifier>({ scale: 'lg' })]: {
          vars: {
            [themeTokens.scale]: '1.2',
          },
        },
        [getModifierSelector<IModifier>({ scale: 'xl' })]: {
          vars: {
            [themeTokens.scale]: '1.4',
          },
        },
      },
    },
  },
});

const spacingValues = getSpacingValues();

const sprinklesProps = defineProperties({
  '@layer': cssLayers.sprinkles,
  dynamicProperties: {
    margin: spacingValues,
    marginTop: spacingValues,
    marginBottom: spacingValues,
    marginLeft: spacingValues,
    marginRight: spacingValues,
    marginInlineStart: spacingValues,
    marginInlineEnd: spacingValues,
    marginInline: spacingValues,
    marginBlock: spacingValues,
    padding: spacingValues,
    paddingTop: spacingValues,
    paddingBottom: spacingValues,
    paddingLeft: spacingValues,
    paddingRight: spacingValues,
    paddingInlineStart: spacingValues,
    paddingInlineEnd: spacingValues,
    paddingInline: spacingValues,
    paddingBlock: spacingValues,
    width: spacingValues,
    minWidth: spacingValues,
    maxWidth: spacingValues,
    height: spacingValues,
    minHeight: spacingValues,
    maxHeight: spacingValues,
    alignItems: true,
    justifyContent: true,
    textTransform: true,
    textDecoration: true,
    textAlign: true,
    position: true,
    top: true,
    left: true,
    bottom: true,
    right: true,
    inset: true,
    display: true,
    flex: true,
    flexGrow: true,
    flexShrink: true,
    fontSize: spacingValues,
    zIndex: themeTokens.zIndex,
    opacity: true,
    color: themeTokens.colorScheme,
  },
  shorthands: {
    m: ['margin'],
    mt: ['marginTop'],
    mb: ['marginBottom'],
    ml: ['marginLeft'],
    mr: ['marginRight'],
    ms: ['marginInlineStart'],
    me: ['marginInlineEnd'],
    mx: ['marginInline'],
    my: ['marginBlock'],
    p: ['padding'],
    pt: ['paddingTop'],
    pb: ['paddingBottom'],
    pl: ['paddingLeft'],
    pr: ['paddingRight'],
    ps: ['paddingInlineStart'],
    pe: ['paddingInlineEnd'],
    px: ['paddingInline'],
    py: ['paddingBlock'],
    w: ['width'],
    miw: ['minWidth'],
    maw: ['maxWidth'],
    h: ['height'],
    mih: ['minHeight'],
    mah: ['maxHeight'],
    ta: ['textAlign'],
    c: ['color'],
    fz: ['fontSize'],
    tt: ['textTransform'],
    td: ['textDecoration'],
    z: ['zIndex'],
    o: ['opacity'],
    pos: ['position'],
    grow: ['flexGrow'],
    shrink: ['flexShrink'],
  },
});

export const boxSprinkles = createRainbowSprinkles(sprinklesProps);

export type IBoxSprinkles = Pick<
  Parameters<typeof boxSprinkles>[0],
  | 'm'
  | 'mt'
  | 'mb'
  | 'ml'
  | 'mr'
  | 'ms'
  | 'mx'
  | 'my'
  | 'p'
  | 'pt'
  | 'pb'
  | 'pl'
  | 'pr'
  | 'ps'
  | 'px'
  | 'py'
  | 'w'
  | 'miw'
  | 'maw'
  | 'h'
  | 'mih'
  | 'mah'
  | 'ta'
  | 'c'
  | 'fz'
  | 'tt'
  | 'td'
  | 'z'
  | 'o'
  | 'pos'
  | 'grow'
  | 'shrink'
  | 'flex'
>;
