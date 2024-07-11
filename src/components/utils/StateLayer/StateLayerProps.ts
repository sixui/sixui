import type { IContainerProps } from '@/helpers/types';
import type { IVisualState } from '@/components/utils/VisualState';
import type { IStateLayerStyleKey } from './StateLayer.styledefs';

export type IStateLayerProps = IContainerProps<IStateLayerStyleKey> & {
  visualState?: IVisualState;
  for?: React.RefObject<HTMLElement>;
  disabled?: boolean;
  children?: React.ReactNode;
};
