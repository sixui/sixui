import { OVERLAY_ID_SYMBOL } from './Overlays.constants';

export type IOverlayFC<TProps extends object> = React.FC<TProps> & {
  [OVERLAY_ID_SYMBOL]?: string;
};

export interface IOverlay<TProps extends object> {
  id?: string;
  component: IOverlayFC<TProps>;
  props?: TProps;
  layer?: string;
}
