import type { IPolymorphicComponentFactory } from '~/utils/polymorphicComponentFactory';
import type { IStylesProps } from '~/hooks/useStyles2';
import type { IBoxProps } from '../Box';
import type { avatarStyles, IAvatarStylesFactory } from './Avatar.css';

export type IAvatarVariant = 'rounded' | 'squared';

export type IAvatarFactory = IPolymorphicComponentFactory<{
  props: IAvatarProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  styles: typeof avatarStyles;
}>;

export type IAvatarProps = IBoxProps &
  IStylesProps<IAvatarStylesFactory> & {
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
  };
