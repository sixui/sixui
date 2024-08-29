import clsx from 'clsx';

import type { IInteractions } from '~/hooks/useInteractions';
import type { IModifiers } from '~/utils/getDataAttributes';

export type IBoxProps = {
  className?: Parameters<typeof clsx>[0];
  interactions?: IInteractions;
  modifiers?: IModifiers;
};
