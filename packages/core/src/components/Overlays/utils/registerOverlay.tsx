import { useEffect } from 'react';

import type { IOverlayFC, IOverlayFCProps } from '../Overlays.types';
import { getUid } from '~/utils/getUid';
import { OverlayProvider, useOverlayContext } from '../Overlay.context';
import { COMPONENT_ID, OVERLAY_ID_SYMBOL } from '../Overlays.constants';
import { overlaysGlobals } from '../Overlays.globals';
import { useOverlaysDispatchContext } from '../OverlaysDispatch.context';

export type IRegisterOverlayOptions = {
  id?: string;
  layer?: string;
};

export const registerOverlay = <TProps extends object>(
  Component: React.FC<IOverlayFCProps<TProps>>,
  options?: IRegisterOverlayOptions,
): IOverlayFC<TProps> => {
  const overlayId = options?.id ?? getUid();

  const Overlay: IOverlayFC<TProps> = (props: IOverlayFCProps<TProps>) => {
    const overlaysDispatchContext = useOverlaysDispatchContext();
    const overlayContext = useOverlayContext();

    useEffect(() => {
      overlaysDispatchContext.dispatch({
        type: `${COMPONENT_ID}/mounted`,
        payload: {
          overlayId,
          instanceId: props.instanceId,
        },
      });
    }, [overlaysDispatchContext, props.instanceId]);

    return (
      <OverlayProvider
        value={{
          overlayId: overlayContext?.overlayId ?? overlayId,
          instanceId: props.instanceId,
        }}
      >
        <Component {...props} />
      </OverlayProvider>
    );
  };

  Overlay[OVERLAY_ID_SYMBOL] = overlayId;

  overlaysGlobals.register(overlayId, {
    overlayId,
    component: Overlay,
    layer: options?.layer,
  });

  return Overlay;
};
