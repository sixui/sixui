import type { IComponentFactory } from '~/utils/componentFactory';
import type { IStylesProps } from '~/hooks/useStyles2';
import type { IStateLayerContext } from './useStateLayer';
import type { IBoxProps } from '../Box';
import type {
  stateLayerStyles,
  IStateLayerStylesFactory,
} from './StateLayer.css';

export type IStateLayerProps = IBoxProps &
  IStylesProps<IStateLayerStylesFactory> & {
    context: IStateLayerContext;
  };

export type IStateLayerFactory = IComponentFactory<{
  props: IStateLayerProps;
  ref: HTMLDivElement;
  styles: typeof stateLayerStyles;
}>;
