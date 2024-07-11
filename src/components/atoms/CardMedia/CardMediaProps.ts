import type { IContainerProps } from '@/helpers/types';
import type { ICardMediaStyleKey } from './CardMedia.styledefs';

export type ICardMediaProps = IContainerProps<ICardMediaStyleKey> & {
  children?: React.ReactNode;
  src?: string;
  title?: string;
};
