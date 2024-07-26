import type { IContainerProps } from '~/helpers/types';
import type { ICardContentStylesKey } from './CardContent.styles';

export type ICardContentProps = IContainerProps<ICardContentStylesKey> & {
  children?: React.ReactNode;
};
