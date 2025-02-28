import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component';
import type { cardMediaTheme, ICardMediaThemeFactory } from './CardMedia.css';

export interface ICardMediaOwnProps {
  children?: React.ReactNode;
  src?: string;
}

export interface ICardMediaProps
  extends IBoxProps,
    IComponentThemeProps<ICardMediaThemeFactory>,
    ICardMediaOwnProps {}

export type ICardMediaFactory = IPolymorphicComponentFactory<{
  props: ICardMediaProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof cardMediaTheme;
}>;
