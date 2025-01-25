import type { IBoxProps } from '~/components/Box';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { cardMediaTheme, ICardMediaThemeFactory } from './CardMedia.css';

export interface ICardMediaOwnProps {
  children?: React.ReactNode;
  src?: string;
}

export interface ICardMediaProps
  extends IBoxProps,
    IComponentThemeProps<ICardMediaThemeFactory>,
    ICardMediaOwnProps {}

export type ICardMediaFactory = IComponentFactory<{
  props: ICardMediaProps;
  ref: HTMLDivElement;
  theme: typeof cardMediaTheme;
}>;
