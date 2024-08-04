import type { IBaseProps } from '../Base';
import type { ICardTitleStylesKey } from './CardTitle.styles';

export type ICardTitleProps = IBaseProps<ICardTitleStylesKey> & {
  headline?: React.ReactNode;
  subhead?: React.ReactNode;
  supportingText?: React.ReactNode;
};
