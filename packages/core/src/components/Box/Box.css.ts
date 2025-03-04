import { style } from '@vanilla-extract/css';
import { createRainbowSprinkles, defineProperties } from 'rainbow-sprinkles';

import {
  IThemeWindowSizeClassName,
  windowSizeClassNames,
} from '~/components/Theme';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { responsiveContainerQuery } from '~/utils/css/responsiveContainerQuery';
import { cssLayers } from '~/components/Theme/cssLayers.css';
import { themeTokens } from '~/components/Theme/theme.css';

type IModifier = 'scale';

export const styles = {
  root: style({
    '@layer': {
      [cssLayers.components]: {
        selectors: {
          [modifierSelector<IModifier>({ scale: 'xs' })]: {
            vars: {
              [themeTokens.scale]: '0.6',
            },
          },
          [modifierSelector<IModifier>({ scale: 'sm' })]: {
            vars: {
              [themeTokens.scale]: '0.8',
            },
          },
          [modifierSelector<IModifier>({ scale: 'lg' })]: {
            vars: {
              [themeTokens.scale]: '1.2',
            },
          },
          [modifierSelector<IModifier>({ scale: 'xl' })]: {
            vars: {
              [themeTokens.scale]: '1.4',
            },
          },
        },
      },
    },
  }),
};

const sprinklesProps = defineProperties({
  '@layer': cssLayers.sprinkles,
  conditions: {
    base: {},
    ...windowSizeClassNames.reduce(
      (acc, size) => ({
        ...acc,
        [size]: {
          '@container': responsiveContainerQuery({ size }),
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
    margin: themeTokens.spacing,
    marginTop: themeTokens.spacing,
    marginBottom: themeTokens.spacing,
    marginLeft: themeTokens.spacing,
    marginRight: themeTokens.spacing,
    marginInlineStart: themeTokens.spacing,
    marginInlineEnd: themeTokens.spacing,
    marginInline: themeTokens.spacing,
    marginBlock: themeTokens.spacing,
    padding: themeTokens.spacing,
    paddingTop: themeTokens.spacing,
    paddingBottom: themeTokens.spacing,
    paddingLeft: themeTokens.spacing,
    paddingRight: themeTokens.spacing,
    paddingInlineStart: themeTokens.spacing,
    paddingInlineEnd: themeTokens.spacing,
    paddingInline: themeTokens.spacing,
    paddingBlock: themeTokens.spacing,
    border: true,
    background: themeTokens.colorScheme,
    color: themeTokens.colorScheme,
    opacity: true,
    fontFamily: true,
    fontSize: true,
    fontWeight: true,
    letterSpacing: true,
    textAlign: true,
    lineHeight: true,
    fontStyle: true,
    textTransform: true,
    textDecoration: true,
    width: themeTokens.spacing,
    minWidth: themeTokens.spacing,
    maxWidth: themeTokens.spacing,
    height: themeTokens.spacing,
    minHeight: themeTokens.spacing,
    maxHeight: themeTokens.spacing,
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
    flexGrow: true,
    flexShrink: true,
    borderRadius: themeTokens.spacing,
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
  | 'grow'
  | 'shrink'
>;
