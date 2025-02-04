import type { IOverlayFC, IOverlayFCProps } from '../Overlays.types';
import { getUid } from '~/utils/getUid';
import { OverlayProvider } from '../Overlay.context';
import { OVERLAY_ID_SYMBOL } from '../Overlays.constants';
import { overlaysGlobals } from '../Overlays.globals';

export type IRegisterOverlayOptions = {
  id?: string;
  layer?: string;
};

export const registerOverlay = <TProps extends object>(
  Component: IOverlayFC<TProps>,
  options?: IRegisterOverlayOptions,
): IOverlayFC<TProps> => {
  const overlayId = options?.id ?? getUid();

  const Overlay: IOverlayFC<TProps> & {
    [OVERLAY_ID_SYMBOL]: string;
  } = (props: IOverlayFCProps<TProps>) => (
    <OverlayProvider value={{ overlayId }}>
      <Component {...props} />
    </OverlayProvider>
  );

  Overlay[OVERLAY_ID_SYMBOL] = overlayId;

  overlaysGlobals.register({
    overlayId,
    component: Overlay,
    layer: options?.layer,
  });

  return Overlay;
};
