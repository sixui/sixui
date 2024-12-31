import type { IBaseProps } from '../Base';
import type { ICardActionsStyleKsey } from './CardActions.styles';

export type ICardActionsProps = IBaseProps<ICardActionsStyleKsey> & {
  children: React.ReactNode;
};
