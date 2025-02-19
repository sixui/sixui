import type { IOverlayInstance } from './Overlays.reducer';
import { OVERLAY_ID_SYMBOL } from './Overlays.constants';

export type IOverlayFCProps<TProps extends object> = TProps & {
  instanceId: string;
};

export type IOverlayFC<TProps extends object> = React.FC<
  IOverlayFCProps<TProps>
> & {
  [OVERLAY_ID_SYMBOL]: string;
};

export interface IRegisteredOverlay<TProps extends object> {
  overlayId: string;
  props?: TProps;
  layer?: string;
  component: IOverlayFC<TProps>;
}

export type IRennderableOverlay<TProps extends object> =
  IOverlayInstance<TProps> & IRegisteredOverlay<TProps>;

export type IRegisteredOverlayUpdate<TProps extends object> = Pick<
  IRegisteredOverlay<TProps>,
  'props' | 'layer'
>;
