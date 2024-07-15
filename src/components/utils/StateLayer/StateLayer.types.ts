import type { IContainerProps } from '@/helpers/types';
import type { IVisualState } from '@/components/utils/VisualState';
import type { IStateLayerStylesKey } from './StateLayer.styles';

export type IStateLayerProps = IContainerProps<IStateLayerStylesKey> & {
  visualState?: IVisualState;
  for?: React.RefObject<HTMLElement>;
  disabled?: boolean;
  children?: React.ReactNode;
};
