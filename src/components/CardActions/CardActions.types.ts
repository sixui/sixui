import type { IContainerProps } from '@/helpers/types';
import type { ICardActionsStyleKsey } from './CardActions.styles';

export type ICardActionsProps = IContainerProps<ICardActionsStyleKsey> & {
  children: React.ReactNode;
};
