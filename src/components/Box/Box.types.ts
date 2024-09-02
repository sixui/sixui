import type cx from 'clsx';

import type { IInteractions } from '~/hooks/useInteractions';
import type { IModifiers } from '~/utils/getDataAttributes';
import type { IBoxSprinkles } from './Box.css';

export type IBoxProps = IBoxSprinkles & {
  className?: Parameters<typeof cx>[0];
  style?: React.CSSProperties;
  interactions?: IInteractions;
  modifiers?: IModifiers;
};
