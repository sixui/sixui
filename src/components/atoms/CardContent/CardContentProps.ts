import type { IContainerProps } from '@/helpers/types';
import type { ICardContentStyleKey } from './CardContent.styledefs';

export type ICardContentProps = IContainerProps<ICardContentStyleKey> & {
  children?: React.ReactNode;
};
