import type { IContainerProps } from '@/helpers/types';
import type { ICardActionsStyleKey } from './CardActions.styles';

export type ICardActionsProps = IContainerProps<ICardActionsStyleKey> & {
  children: React.ReactNode;
};
