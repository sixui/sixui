import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { cardTitleTheme, ICardTitleThemeFactory } from './CardTitle.css';

export interface ICardTitleOwnProps {
  headline?: React.ReactNode;
  subhead?: React.ReactNode;
  supportingText?: React.ReactNode;
}

export interface ICardTitleProps
  extends IBoxProps,
    IComponentThemeProps<ICardTitleThemeFactory>,
    ICardTitleOwnProps {}

export type ICardTitleFactory = IComponentFactory<{
  props: ICardTitleProps;
  ref: HTMLDivElement;
  theme: typeof cardTitleTheme;
}>;
