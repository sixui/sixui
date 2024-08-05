import type { FloatingContext, FloatingOverlayProps } from '@floating-ui/react';

import type { IBaseProps } from '../Base';
import type { IScrimStylesKey } from './Scrim.styles';

export type IScrimVariant = 'darken' | 'lighten';

export type IScrimProps = IBaseProps<IScrimStylesKey> &
  FloatingOverlayProps & {
    floatingContext: FloatingContext;
    contained?: boolean;
    variant?: IScrimVariant;
    children: React.ReactNode;
  };
