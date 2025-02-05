import type { IOverlayFC, IOverlayFCProps } from '../Overlays.types';
import { getUid } from '~/utils/getUid';
import { OverlayProvider, useOverlayContext } from '../Overlay.context';
import { OVERLAY_ID_SYMBOL } from '../Overlays.constants';
import { overlaysGlobals } from '../Overlays.globals';

export type IRegisterOverlayOptions = {
  id?: string;
};

export const registerOverlay = <TProps extends object>(
  Component: React.FC<IOverlayFCProps<TProps>>,
  options?: IRegisterOverlayOptions,
): IOverlayFC<TProps> => {
  const overlayId = options?.id ?? getUid();

  const Overlay: IOverlayFC<TProps> = (props: IOverlayFCProps<TProps>) => {
    const overlayContext = useOverlayContext();

    return (
      <OverlayProvider
        value={{ overlayId: overlayContext?.overlayId ?? overlayId }}
      >
        <Component {...props} />
      </OverlayProvider>
    );
  };

  Overlay[OVERLAY_ID_SYMBOL] = overlayId;

  overlaysGlobals.register(overlayId, {
    overlayId,
    component: Overlay,
  });

  return Overlay;
};
