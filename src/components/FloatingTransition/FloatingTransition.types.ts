import type { Placement } from '@floating-ui/react';

import type { IContainerProps, IOrientation } from '~/helpers/types';
import type { IFloatingTransitionStylesKey } from './FloatingTransition.styles';

export type IFloatingTransitionStatus =
  | 'unmounted'
  | 'initial'
  | 'open'
  | 'close';

export type IFloatingTransitionOrigin = 'center' | 'corner' | 'edge' | 'cursor';

export type IFloatingTransitionProps =
  IContainerProps<IFloatingTransitionStylesKey> & {
    children: React.ReactNode;
    placement: Placement;
    status: IFloatingTransitionStatus;
    origin?: IFloatingTransitionOrigin;
    orientation?: IOrientation;
    cursorTransformOrigin?: string;
    pattern?: false | 'enterExit';
  };
