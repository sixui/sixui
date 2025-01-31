import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IComponentFactory } from '~/utils/component/componentFactory';
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
