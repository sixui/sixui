import type cx from 'clsx';

import type { IInteractions } from '~/hooks/useInteractions';
import type { IModifiers } from '~/utils/getDataAttributes';

export type IBoxProps = {
  className?: Parameters<typeof cx>[0];
  interactions?: IInteractions;
  modifiers?: IModifiers;
};
