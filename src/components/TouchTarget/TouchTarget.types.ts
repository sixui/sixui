import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IStylesProps } from '~/utils/styles/useStyles';
import type { IBoxProps } from '../Box';
import type {
  touchTargetStyles,
  ITouchTargetStylesFactory,
} from './TouchTarget.css';

export type ITouchTargetOwnProps = {
  children?: React.ReactNode;
};

export interface ITouchTargetProps
  extends IBoxProps,
    IStylesProps<ITouchTargetStylesFactory>,
    ITouchTargetOwnProps {}

export type ITouchTargetFactory = IComponentFactory<{
  props: ITouchTargetProps;
  ref: HTMLDivElement;
  styles: typeof touchTargetStyles;
}>;
