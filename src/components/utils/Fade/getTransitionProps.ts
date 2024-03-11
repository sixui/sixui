type IComponentProps = {
  style?: React.CSSProperties;
  easing?: string | { enter?: string; exit?: string };
  timeout: number | { enter?: number; exit?: number };
};

type IOptions = {
  mode: 'enter' | 'exit';
};

type ITransitionProps = {
  duration: string | number;
  easing: string | undefined;
  delay: string | undefined;
};

export const getTransitionProps = (
  props: IComponentProps,
  options: IOptions,
): ITransitionProps => {
  const { timeout, easing, style = {} } = props;

  return {
    duration:
      style.transitionDuration ??
      (typeof timeout === 'number' ? timeout : timeout[options.mode] ?? 0),
    easing:
      style.transitionTimingFunction ??
      (typeof easing === 'object' ? easing[options.mode] : easing),
    delay: style.transitionDelay,
  };
};
