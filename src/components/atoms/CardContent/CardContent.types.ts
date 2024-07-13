import type { IContainerProps } from '@/helpers/types';
import type { ICardContentStyleKey } from './CardContent.styles';

export type ICardContentProps = IContainerProps<ICardContentStyleKey> & {
  children?: React.ReactNode;
};
