import clsx from 'clsx';

import type { IInteractions } from '~/hooks/useInteractions';

export type IBoxModifiers = Record<
  string,
  string | number | boolean | undefined
>;

export type IBoxProps = {
  className?: Parameters<typeof clsx>[0];
  interactions?: IInteractions;
  modifiers?: IBoxModifiers;
};
