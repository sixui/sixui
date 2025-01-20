import { createRainbowSprinkles, defineProperties } from 'rainbow-sprinkles';

import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getResponsiveContainerQuery } from '~/helpers/styles/getResponsiveContainerQuery';
import { getSpacingValues } from '~/helpers/styles/getSpacingValues';
import { createStyles } from '~/utils/styles/createStyles';
import {
  cssLayers,
  IThemeWindowSizeClassName,
  themeTokens,
  windowSizeClassNames,
} from '../ThemeProvider';

type IModifier = 'scale';

export const classNames = createStyles({
  root: {
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
  },
});

const spacingValues = getSpacingValues();

const sprinklesProps = defineProperties({
  '@layer': cssLayers.sprinkles,
  conditions: {
    base: {},
    ...windowSizeClassNames.reduce(
      (acc, size) => ({
        ...acc,
        [size]: {
          '@container': getResponsiveContainerQuery({ size }),
        },
      }),
      {} as Record<
        IThemeWindowSizeClassName,
        {
          '@media'?: string;
          '@supports'?: string;
          '@container'?: string;
          selector?: string;
        }
      >,
    ),
  },
  defaultCondition: 'base',
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
    border: true,
    background: themeTokens.colorScheme,
    color: themeTokens.colorScheme,
    opacity: true,
    fontFamily: true,
    fontSize: spacingValues,
    fontWeight: true,
    letterSpacing: true,
    textAlign: true,
    lineHeight: true,
    fontStyle: true,
    textTransform: true,
    textDecoration: true,
    width: spacingValues,
    minWidth: spacingValues,
    maxWidth: spacingValues,
    height: spacingValues,
    minHeight: spacingValues,
    maxHeight: spacingValues,
    backgroundSize: true,
    backgroundPosition: true,
    backgroundRepeat: true,
    backgroundAttachment: true,
    position: true,
    top: true,
    left: true,
    bottom: true,
    right: true,
    inset: true,
    display: true,
    flex: true,
    alignItems: true,
    justifyContent: true,
    flexGrow: true,
    flexShrink: true,
    borderRadius: spacingValues,
    zIndex: themeTokens.zIndex,
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
    bd: ['border'],
    bg: ['background'],
    c: ['color'],
    opacity: ['opacity'],
    ff: ['fontFamily'],
    fz: ['fontSize'],
    fw: ['fontWeight'],
    lts: ['letterSpacing'],
    ta: ['textAlign'],
    lh: ['lineHeight'],
    fs: ['fontStyle'],
    tt: ['textTransform'],
    td: ['textDecoration'],
    w: ['width'],
    miw: ['minWidth'],
    maw: ['maxWidth'],
    h: ['height'],
    mih: ['minHeight'],
    mah: ['maxHeight'],
    bgsz: ['backgroundSize'],
    bgp: ['backgroundPosition'],
    bgr: ['backgroundRepeat'],
    bga: ['backgroundAttachment'],
    pos: ['position'],
    top: ['top'],
    left: ['left'],
    bottom: ['bottom'],
    right: ['right'],
    inset: ['inset'],
    display: ['display'],
    flex: ['flex'],
    br: ['borderRadius'],
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
  | 'pe'
  | 'px'
  | 'py'
  | 'bd'
  | 'bg'
  | 'c'
  | 'opacity'
  | 'ff'
  | 'fz'
  | 'lts'
  | 'ta'
  | 'lh'
  | 'fs'
  | 'tt'
  | 'td'
  | 'w'
  | 'miw'
  | 'maw'
  | 'h'
  | 'mih'
  | 'mah'
  | 'bgsz'
  | 'bgp'
  | 'bgr'
  | 'bga'
  | 'pos'
  | 'top'
  | 'left'
  | 'bottom'
  | 'right'
  | 'inset'
  | 'display'
  | 'flex'
  | 'br'
  | 'z'
>;
