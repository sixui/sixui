import { OVERLAY_ID_SYMBOL } from './Overlays.constants';

export type IOverlayFC<TProps extends Record<string, unknown>> =
  React.FC<TProps> & {
    [OVERLAY_ID_SYMBOL]?: string;
  };

export interface IOverlay<TProps extends Record<string, unknown>> {
  overlayId: string;
  component: IOverlayFC<TProps>;
  props?: TProps;
  layer?: string;
}
