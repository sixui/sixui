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
    grow,
    shrink,
    flex,
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
    px,
    py,
    w,
    miw,
    maw,
    h,
    mih,
    mah,
    ta,
    c,
    fz,
    tt,
    td,
    z,
    o,
    pos,
    ...other
  } = props;

  const boxProps: IBoxProps = removeUndefineds({
    className,
    style,
    interactions,
    modifiers,
    scale,
    density,
    grow,
    shrink,
    flex,
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
    px,
    py,
    w,
    miw,
    maw,
    h,
    mih,
    mah,
    ta,
    c,
    fz,
    tt,
    td,
    z,
    o,
    pos,
  });

  return {
    boxProps,
    other,
  };
};
