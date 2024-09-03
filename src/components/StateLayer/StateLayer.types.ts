import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IStylesProps } from '~/utils/styles/useStyles';
import type { IUseStateLayerResult } from './useStateLayer';
import type { IBoxProps } from '../Box';
import type {
  stateLayerStyles,
  IStateLayerStylesFactory,
} from './StateLayer.css';

export type IStateLayerOwnProps = {
  context: IUseStateLayerResult;
};

export interface IStateLayerProps
  extends IBoxProps,
    IStylesProps<IStateLayerStylesFactory>,
    IStateLayerOwnProps {}

export type IStateLayerFactory = IComponentFactory<{
  props: IStateLayerProps;
  ref: HTMLDivElement;
  styles: typeof stateLayerStyles;
}>;
