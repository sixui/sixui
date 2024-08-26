import type { IBoxProps } from '../Box';
import type { IVisualState } from '../VisualState';
import type { IStateLayerClassName } from './StateLayer.css';

export type IStateLayerProps = IBoxProps<IStateLayerClassName> & {
  visualState?: IVisualState;
  for?: React.RefObject<HTMLElement>;
  disabled?: boolean;
  children?: React.ReactNode;
};
