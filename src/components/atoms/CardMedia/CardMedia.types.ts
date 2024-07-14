import type { IContainerProps } from '@/helpers/types';
import type { ICardMediaStylesKey } from './CardMedia.styles';

export type ICardMediaProps = IContainerProps<ICardMediaStylesKey> & {
  children?: React.ReactNode;
  src?: string;
  title?: string;
};
