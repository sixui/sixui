import { removeUndefineds } from '@olivierpascal/helpers';

import type { IBoxProps } from './Box.types';

export type IUseForwardedPropsResult = {
  boxProps?: IBoxProps;
  other?: Record<string, unknown>;
};

export const extractBoxProps = <TProps extends IBoxProps>(
  props: TProps,
): IUseForwardedPropsResult => {
  const {
    className,
    style,
    interactions,
    modifiers,
    scale,
    density,
    m,
    mt,
    mb,
    ml,
    mr,
    ms,
    mx,
    my,
    p,
    pt,
    pb,
    pl,
    pr,
    ps,
    pe,
    px,
    py,
    bd,
    bg,
    c,
    opacity,
    ff,
    fz,
    lts,
    ta,
    lh,
    fs,
    tt,
    td,
    w,
    miw,
    maw,
    h,
    mih,
    mah,
    bgsz,
    bgp,
    bgr,
    bga,
    pos,
    top,
    left,
    bottom,
    right,
    inset,
    display,
    flex,
    br,
    z,
    grow,
    shrink,
    ...other
  } = props;

  const boxProps: IBoxProps = removeUndefineds({
    className,
    style,
    interactions,
    modifiers,
    scale,
    density,
    m,
    mt,
    mb,
    ml,
    mr,
    ms,
    mx,
    my,
    p,
    pt,
    pb,
    pl,
    pr,
    ps,
    pe,
    px,
    py,
    bd,
    bg,
    c,
    opacity,
    ff,
    fz,
    lts,
    ta,
    lh,
    fs,
    tt,
    td,
    w,
    miw,
    maw,
    h,
    mih,
    mah,
    bgsz,
    bgp,
    bgr,
    bga,
    pos,
    top,
    left,
    bottom,
    right,
    inset,
    display,
    flex,
    br,
    z,
    grow,
    shrink,
  });

  return {
    boxProps,
    other,
  };
};
