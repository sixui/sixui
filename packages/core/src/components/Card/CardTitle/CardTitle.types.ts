import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
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
