export type IBoxModifiers = Record<
  string,
  string | number | boolean | undefined
>;

export type IBoxProps<TClassName extends string = never> = {
  className?: string;
  classNames?: Partial<Record<TClassName, string>>;
  style?: React.CSSProperties;
  modifiers?: IBoxModifiers;
};
