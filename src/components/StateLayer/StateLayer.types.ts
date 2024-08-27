import type { IBoxProps } from '../Box';
import type { IStateLayerClassName } from './StateLayer.css';
import type { IStateLayerContext } from './useStateLayer';

export type IStateLayerProps = IBoxProps<IStateLayerClassName> & {
  context: IStateLayerContext;
};
