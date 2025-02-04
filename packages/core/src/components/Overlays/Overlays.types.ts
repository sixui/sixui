import { OVERLAY_ID_SYMBOL } from './Overlays.constants';

export type IOverlayFCProps<TProps extends object> = TProps & {
  instanceId?: string;
};

export type IOverlayFC<TProps extends object> = React.FC<
  IOverlayFCProps<TProps>
> & {
  [OVERLAY_ID_SYMBOL]?: string;
};

export interface IOverlay<TProps extends object> {
  overlayId: string;
  component: IOverlayFC<TProps>;
  props?: TProps;
  layer?: string;
}
