import type { IContainerProps } from '@/helpers/types';

import type { IAvatarStyleKey } from './Avatar.styledefs';

export type IAvatarProps = IContainerProps<IAvatarStyleKey> &
  Pick<
    React.ImgHTMLAttributes<HTMLImageElement>,
    'alt' | 'crossOrigin' | 'referrerPolicy' | 'src' | 'srcSet' | 'sizes'
  > & {
    /**
     * Used to render icon or text elements inside the Avatar if `src` is not set. This can be an
     * element, or just a string.
     */
    children?: React.ReactNode;
  };
