import type { IBoxProps } from '~/components/Box';
import type { IFlexOwnProps } from '~/components/Flex';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  cardActionsTheme,
  ICardActionsThemeFactory,
} from './CardActions.css';

export interface ICardActionsOwnProps extends IFlexOwnProps {
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
