import type { IBaseProps } from '~/components/Base';
import type { IAvatarStylesKey } from './Avatar.styles';

export type IAvatarVariant = 'rounded' | 'squared';

export type IAvatarProps = IBaseProps<IAvatarStylesKey> &
  Pick<
    React.ImgHTMLAttributes<HTMLImageElement>,
    'alt' | 'crossOrigin' | 'referrerPolicy' | 'src' | 'srcSet' | 'sizes'
  > & {
    /**
     * Used to render icon or text elements inside the Avatar if `src` is not
     * set. This can be an element, or just a string.
     */
    children?: React.ReactNode;

    fallbackToRandomColor?: boolean;
    randomColorSourceString?: string;
    variant?: IAvatarVariant;
  };
