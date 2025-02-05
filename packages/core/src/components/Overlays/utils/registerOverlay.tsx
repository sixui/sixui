import { useEffect } from 'react';

import type { IOverlayFC, IOverlayFCProps } from '../Overlays.types';
import { getUid } from '~/utils/getUid';
import { OverlayProvider, useOverlayContext } from '../Overlay.context';
import { COMPONENT_ID, OVERLAY_ID_SYMBOL } from '../Overlays.constants';
import { useOverlaysContext } from '../Overlays.context';
import { overlaysGlobals } from '../Overlays.globals';

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
    const overlaysContext = useOverlaysContext();
    const overlayContext = useOverlayContext();

    useEffect(() => {
      overlaysContext.dispatch({
        type: `${COMPONENT_ID}/mounted`,
        payload: {
          overlayId,
          instanceId: props.instanceId,
        },
      });
      console.log('_MOUNTED');

      return () => {
        // console.log('_UNMOUNTED');
        // overlaysContext.dispatch({
        //   type: `${COMPONENT_ID}/unmounted`,
        //   payload: {
        //     overlayId,
        //     instanceId: props.instanceId,
        //   },
        // });
      };
    }, []);

    return (
      <OverlayProvider
        value={{
          overlayId: overlayContext?.overlayId ?? overlayId,
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
