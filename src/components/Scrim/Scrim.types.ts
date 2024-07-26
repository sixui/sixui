import type { FloatingContext, FloatingOverlayProps } from '@floating-ui/react';

import type { IContainerProps } from '~/helpers/types';
import type { IScrimStylesKey } from './Scrim.styles';

export type IScrimVariant = 'darken' | 'lighten';

export type IScrimProps = IContainerProps<IScrimStylesKey> &
  FloatingOverlayProps & {
    context: FloatingContext;
    contained?: boolean;
    variant?: IScrimVariant;
    children?: React.ReactNode;
  };
