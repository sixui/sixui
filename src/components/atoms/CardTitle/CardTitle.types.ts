import type { IContainerProps } from '@/helpers/types';
import type { ICardTitleStyleKey } from './CardTitle.styles';

export type ICardTitleProps = IContainerProps<ICardTitleStyleKey> & {
  headline?: React.ReactNode;
  subhead?: React.ReactNode;
  supportingText?: React.ReactNode;
};
