import type { IInteractions } from '~/hooks/useInteractions';

export type IBoxModifiers = Record<
  string,
  string | number | boolean | undefined
>;

export type IBoxProps<TClassName extends string = never> = {
  className?: string;
  classNames?: Partial<Record<TClassName, string>>;
  style?: React.CSSProperties;
  interactions?: IInteractions;
  modifiers?: IBoxModifiers;
};
