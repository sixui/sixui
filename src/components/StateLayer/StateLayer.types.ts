import type { IContainerProps } from '~/helpers/types';
import type { IVisualState } from '../VisualState';
import type { IStateLayerStylesKey } from './StateLayer.styles';

export type IStateLayerProps = IContainerProps<IStateLayerStylesKey> & {
  visualState?: IVisualState;
  for?: React.Ref<HTMLElement>;
  disabled?: boolean;
  children?: React.ReactNode;
};
