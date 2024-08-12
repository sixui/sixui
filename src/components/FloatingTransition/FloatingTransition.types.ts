import type { Placement } from '@floating-ui/react';

import type { IOrientation } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { IFloatingTransitionStylesKey } from './FloatingTransition.styles';

export type IFloatingTransitionStatus =
  | 'unmounted'
  | 'initial'
  | 'open'
  | 'close';

export type IFloatingTransitionOrigin = 'center' | 'corner' | 'edge' | 'cursor';

export type IFloatingTransitionPattern = 'enterExit' | 'enterExitOffScreen';

export type IFloatingTransitionProps =
  IBaseProps<IFloatingTransitionStylesKey> & {
    children: React.ReactNode;
    placement: Placement;
    status: IFloatingTransitionStatus;
    origin?: IFloatingTransitionOrigin;
    orientation?: IOrientation;
    cursorTransformOrigin?: string;
    pattern?: IFloatingTransitionPattern;
    disabled?: boolean;
  };
