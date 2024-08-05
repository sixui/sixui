import type { IBaseProps } from '../Base';
import type { IVisualState } from '../VisualState';
import type { IStateLayerStylesKey } from './StateLayer.styles';

export type IStateLayerProps = IBaseProps<IStateLayerStylesKey> & {
  visualState?: IVisualState;
  for?: React.Ref<HTMLElement>;
  disabled?: boolean;
  children?: React.ReactNode;
};
