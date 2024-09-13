export type IUseForwardedPropsResult = {
  rootProps?: Record<string, unknown>;
  forwardedProps?: Record<string, unknown>;
};

export const useForwardedProps = (
  props: Record<string, unknown>,
): IUseForwardedPropsResult => {
  const {
    className,
    style,
    interactions,
    modifiers,
    size,
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
    // other
    ...other
  } = props;

  const boxProps = {
    className,
    style,
    interactions,
    modifiers,
    size,
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
  };

  const rootProps = boxProps;
  const forwardedProps = other;

  return {
    rootProps,
    forwardedProps,
  };
};
