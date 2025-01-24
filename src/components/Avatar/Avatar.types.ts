import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { avatarTheme, IAvatarThemeFactory } from './Avatar.css';

export interface IAvatarOwnProps extends IPaperOwnProps {
  src?: string;
  alt?: string;
  imgProps?: React.ComponentPropsWithoutRef<'img'>;

  /**
   * Used to render icon or text elements inside the Avatar if `src` is not
   * set. This can be an element, or just a string.
   */
  children?: React.ReactNode;

  fallbackToRandomColor?: boolean;
  randomColorSourceString?: string;
}

export interface IAvatarProps
  extends IBoxProps,
    IComponentThemeProps<IAvatarThemeFactory>,
    IAvatarOwnProps {}

export type IAvatarFactory = IPolymorphicComponentFactory<{
  props: IAvatarProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof avatarTheme;
}>;
