export type IUseForwardedPropsOptions = {
  forwardBoxProps?: boolean;
  forwardComponentThemeProps?: boolean;
};

export type IUseForwardedPropsResult = {
  rootProps?: Record<string, unknown>;
  forwardedProps?: Record<string, unknown>;
};

export const useForwardedProps = (
  props: Record<string, unknown>,
  options?: IUseForwardedPropsOptions,
): IUseForwardedPropsResult => {
  const {
    // IBoxProps
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
    // IComponentThemeProps
    className,
    style,
    classNames,
    styles,
    variant,
    // other
    ...other
  } = props;

  const boxProps = {
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

  const componentThemeProps = {
    className,
    style,
    classNames,
    styles,
    variant,
  };

  const rootProps = {
    ...(options?.forwardBoxProps ? undefined : boxProps),
    ...(options?.forwardComponentThemeProps ? undefined : componentThemeProps),
  };

  const forwardedProps = {
    ...other,
    ...(options?.forwardBoxProps ? boxProps : undefined),
    ...(options?.forwardComponentThemeProps ? componentThemeProps : undefined),
  };

  return {
    rootProps,
    forwardedProps,
  };
};
