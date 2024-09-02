import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IStylesProps } from '~/utils/styles/useStyles';
import type { IInteractionsState } from '~/hooks/useInteractions';
import type { IBoxProps } from '../Box';
import type {
  touchTargetStyles,
  ITouchTargetStylesFactory,
} from './TouchTarget.css';

export type ITouchTargetOwnProps = {
  children?: React.ReactNode;
  interactionsState?: IInteractionsState;
};

export interface ITouchTargetProps
  extends IBoxProps,
    IStylesProps<ITouchTargetStylesFactory>,
    ITouchTargetOwnProps {}

export type ITouchTargetFactory = IComponentFactory<{
  props: ITouchTargetProps;
  root: HTMLDivElement;
  styles: typeof touchTargetStyles;
}>;
