import type { IContainerProps } from '@/helpers/types';
import type { ICardTitleStylesKey } from './CardTitle.styles';

export type ICardTitleProps = IContainerProps<ICardTitleStylesKey> & {
  headline?: React.ReactNode;
  subhead?: React.ReactNode;
  supportingText?: React.ReactNode;
};
