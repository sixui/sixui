import { IBoxProps } from '~/components/Box';

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

  const boxProps: IBoxProps = {
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

  return {
    boxProps,
    other,
  };
};
