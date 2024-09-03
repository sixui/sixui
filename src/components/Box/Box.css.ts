import { defineProperties, createRainbowSprinkles } from 'rainbow-sprinkles';

import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { themeTokens } from '../ThemeProvider';

const spacingSizes = [
  0, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44,
  48, 52, 56, 60, 64, 72, 80, 96,
] as const;
const spacingVars = spacingSizes.reduce(
  (acc, size) => ({ ...acc, [size]: px(space(size)) }),
  {} as Record<(typeof spacingSizes)[number], string>,
);

const sprinklesProps = defineProperties({
  dynamicProperties: {
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
  },
  staticProperties: {
    marginTop: spacingVars,
    marginBottom: spacingVars,
    marginLeft: spacingVars,
    marginRight: spacingVars,
    marginInlineStart: spacingVars,
    marginInlineEnd: spacingVars,
    marginInline: spacingVars,
    marginBlock: spacingVars,
    paddingTop: spacingVars,
    paddingBottom: spacingVars,
    paddingLeft: spacingVars,
    paddingRight: spacingVars,
    paddingInlineStart: spacingVars,
    paddingInlineEnd: spacingVars,
    paddingInline: spacingVars,
    paddingBlock: spacingVars,
    width: spacingVars,
    minWidth: spacingVars,
    maxWidth: spacingVars,
    height: spacingVars,
    minHeight: spacingVars,
    maxHeight: spacingVars,
    color: themeTokens.colorScheme,
  },
  shorthands: {
    m: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    mt: ['marginTop'],
    mb: ['marginBottom'],
    ml: ['marginLeft'],
    mr: ['marginRight'],
    ms: ['marginInlineStart'],
    me: ['marginInlineEnd'],
    mx: ['marginInline'],
    my: ['marginBlock'],
    p: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
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
    size: ['width', 'height'],
  },
});

export const boxSprinkles = createRainbowSprinkles(sprinklesProps);

export type IBoxSprinkles = Parameters<typeof boxSprinkles>[0];
