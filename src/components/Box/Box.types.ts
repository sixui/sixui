import type cx from 'clsx';

import type { IInteractions } from '~/hooks/useInteractions';
import type { IModifiers } from '~/utils/getDataAttributes';
import type { IBoxSprinkles } from './Box.css';

export interface IBoxProps extends IBoxSprinkles {
  children?: React.ReactNode;
  className?: Parameters<typeof cx>[0];
  style?: React.CSSProperties;
  interactions?: IInteractions;
  modifiers?: IModifiers;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  density?: number;
}

export type IElementProps<
  TElementType extends React.ElementType,
  TPropsToOmit extends string = never,
> = Omit<React.ComponentPropsWithoutRef<TElementType>, 'style' | TPropsToOmit>;
