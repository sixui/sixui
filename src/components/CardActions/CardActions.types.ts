import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  cardActionsTheme,
  ICardActionsThemeFactory,
} from './CardActions.css';

export interface ICardActionsOwnProps {
  children?: React.ReactNode;
}

export interface ICardActionsProps
  extends IBoxProps,
    IComponentThemeProps<ICardActionsThemeFactory>,
    ICardActionsOwnProps {}

export type ICardActionsFactory = IComponentFactory<{
  props: ICardActionsProps;
  ref: HTMLDivElement;
  theme: typeof cardActionsTheme;
}>;
