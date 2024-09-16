import { defineProperties, createRainbowSprinkles } from 'rainbow-sprinkles';
import { style } from '@vanilla-extract/css';

import { themeTokens } from '../ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getSpacingValues } from '~/helpers/styles/getSpacingValues';

type IModifier = 'size';

export const boxRootClassName = style({
  selectors: {
    [getModifierSelector<IModifier>({ size: 'xs' })]: {
      vars: {
        [themeTokens.scale]: '0.6',
      },
    },
    [getModifierSelector<IModifier>({ size: 'sm' })]: {
      vars: {
        [themeTokens.scale]: '0.8',
      },
    },
    [getModifierSelector<IModifier>({ size: 'lg' })]: {
      vars: {
        [themeTokens.scale]: '1.2',
      },
    },
    [getModifierSelector<IModifier>({ size: 'xl' })]: {
      vars: {
        [themeTokens.scale]: '1.4',
      },
    },
  },
});

const spacingValues = getSpacingValues();

const sprinklesProps = defineProperties({
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
    fontSize: true,
    zIndex: themeTokens.zIndex,
  },
  staticProperties: {
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
>;
