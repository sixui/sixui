import type cx from 'clsx';

import type { ISixuiSize } from '~/helpers/types';
import type { IInteractions } from '~/hooks/useInteractions';
import type { IModifiers } from '~/utils/getDataAttributes';
import type { IBoxSprinkles } from './Box.css';

export interface IBoxProps extends IBoxSprinkles {
  className?: Parameters<typeof cx>[0];
  style?: React.CSSProperties;
  interactions?: IInteractions;
  modifiers?: IModifiers;
  scale?: ISixuiSize;
  density?: number;
}

export type IElementProps<
  TElementType extends React.ElementType,
  TPropsToOmit extends string = never,
> = Omit<React.ComponentPropsWithoutRef<TElementType>, TPropsToOmit>;
