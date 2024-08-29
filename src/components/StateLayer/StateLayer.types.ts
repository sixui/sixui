import type { IBoxProps } from '../Box';
import type { IStateLayerStyleName } from './StateLayer.css';
import type { IStateLayerContext } from './useStateLayer';

export type IStateLayerProps = IBoxProps<IStateLayerStyleName> & {
  context: IStateLayerContext;
};
