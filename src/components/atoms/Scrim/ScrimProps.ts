import type { FloatingContext, FloatingOverlayProps } from '@floating-ui/react';

import type { IContainerProps } from '@/helpers/types';
import type { IScrimStyleKey, IScrimVariant } from './Scrim.styledefs';

export type IScrimProps = IContainerProps<IScrimStyleKey> &
  FloatingOverlayProps & {
    context: FloatingContext;
    contained?: boolean;
    variant?: IScrimVariant;
    children?: React.ReactNode;
  };
