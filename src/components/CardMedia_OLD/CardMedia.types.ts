import type { IBaseProps } from '../Base';
import type { ICardMediaStylesKey } from './CardMedia.styles';

export type ICardMediaProps = IBaseProps<ICardMediaStylesKey> & {
  children?: React.ReactNode;
  src?: string;
  title?: string;
};
