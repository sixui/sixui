import type { IBaseProps } from '../Base';
import type { ICardContentStylesKey } from './CardContent.styles';

export type ICardContentProps = IBaseProps<ICardContentStylesKey> & {
  children?: React.ReactNode;
};
