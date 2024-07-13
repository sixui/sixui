import type { IContainerProps } from '@/helpers/types';
import type { ICardMediaStyleKey } from './CardMedia.styles';

export type ICardMediaProps = IContainerProps<ICardMediaStyleKey> & {
  children?: React.ReactNode;
  src?: string;
  title?: string;
};
