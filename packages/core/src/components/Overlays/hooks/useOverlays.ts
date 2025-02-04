import type { IOverlay } from '../Overlays.types';
import { type IAny } from '~/utils';
import { getUid } from '~/utils/getUid';
import { COMPONENT_ID, OVERLAY_ID_SYMBOL } from '../Overlays.constants';
import { useOverlaysContext } from '../Overlays.context';
import { overlaysGlobals } from '../Overlays.globals';
import { getOverlayId } from '../utils/getOverlayId';

export interface IUseOverlaysResult {
  open: <TProps extends object>(overlay: IOverlay<TProps>) => Promise<unknown>;
  close: (overlayId: string) => void;
  remove: (overlayId: string) => void;
}

export const useOverlays = (): IUseOverlaysResult => {
  const overlaysContext = useOverlaysContext();

  // if (overlaysContext.registry = {};

  const open = (overlay: IOverlay<IAny>): Promise<unknown> => {
    const overlayId = getOverlayId(overlay);

    console.log('____OPEN', overlayId, '->', overlay);

    overlaysGlobals.register(overlay);
    overlaysContext.dispatch({
      type: `${COMPONENT_ID}/open`,
      payload: {
        id: overlayId,
        ...overlay,
      },
    });

    if (!overlaysGlobals.callbacks[overlayId]) {
      // `!` tell ts that theResolve will be written before it is used
      let theResolve!: (args?: unknown) => void;
      // `!` tell ts that theResolve will be written before it is used
      let theReject!: (args?: unknown) => void;
      const promise = new Promise((resolve, reject) => {
        theResolve = resolve;
        theReject = reject;
      });
      overlaysGlobals.callbacks[overlayId] = {
        resolve: theResolve,
        reject: theReject,
        promise,
      };

      return promise;
    }

    return overlaysGlobals.callbacks[overlayId].promise;
  };

  const close = (overlayId: string): void => {
    console.log('____CLOSE', overlayId);

    overlaysContext.dispatch({
      type: `${COMPONENT_ID}/close`,
      payload: {
        id: overlayId,
      },
    });
  };

  const remove = (overlayId: string): void => {
    console.log('____REMOVE', overlayId);

    overlaysContext.dispatch({
      type: `${COMPONENT_ID}/remove`,
      payload: {
        id: overlayId,
      },
    });

    delete overlaysGlobals.callbacks[overlayId];
  };

  return {
    open,
    close,
    remove,
  };
};
