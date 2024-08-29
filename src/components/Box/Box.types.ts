import clsx from 'clsx';

import type { IInteractions } from '~/hooks/useInteractions';

export type IBoxModifiers = Record<
  string,
  string | number | boolean | undefined
>;

export type IBoxProps<TClassName extends string = never> = {
  className?: Parameters<typeof clsx>[0];
  classNames?: Partial<Record<TClassName, string>>;
  style?: React.CSSProperties;
  interactions?: IInteractions;
  modifiers?: IBoxModifiers;
};
