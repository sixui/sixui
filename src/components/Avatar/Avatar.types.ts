import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IStylesProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPaperOwnProps } from '../Paper';
import type { avatarTheme, IAvatarThemeFactory } from './Avatar.css';

export type IAvatarOwnprops = IPaperOwnProps & {
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

export interface IAvatarProps
  extends IBoxProps,
    IStylesProps<IAvatarThemeFactory>,
    IAvatarOwnprops {}

export type IAvatarFactory = IPolymorphicComponentFactory<{
  props: IAvatarProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof avatarTheme;
}>;
