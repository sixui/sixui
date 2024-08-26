import type { IBoxProps } from '../Box';
import type { IAvatarClassName, IAvatarVariant } from './Avatar.css';

export type IAvatarProps = IBoxProps<IAvatarClassName> & {
  src?: string;
  alt?: string;
  slotProps?: {
    img?: React.ComponentPropsWithoutRef<'img'>;
  };

  /**
   * Used to render icon or text elements inside the Avatar if `src` is not
   * set. This can be an element, or just a string.
   */
  children?: React.ReactNode;

  fallbackToRandomColor?: boolean;
  randomColorSourceString?: string;
  variant?: IAvatarVariant;
};
