import type { IBoxProps } from '../Box';
import type { IAvatarStyleName } from './Avatar.css';

export type IAvatarVariant = 'rounded' | 'squared';

// FIXME: use StylesApiProps

export type IAvatarProps = IBoxProps<IAvatarStyleName> & {
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
