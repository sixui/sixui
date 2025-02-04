import type { IOverlay } from '../Overlays.types';
import { type IAny } from '~/utils';
import { COMPONENT_ID } from '../Overlays.constants';
import { useOverlaysContext } from '../Overlays.context';
import { overlaysGlobals } from '../Overlays.globals';

export interface IUseOverlaysResult {
  open: <TProps extends object>(overlay: IOverlay<TProps>) => Promise<unknown>;
  close: (overlayId: string) => void;
}

export const useOverlays = (): IUseOverlaysResult => {
  const overlaysContext = useOverlaysContext();

  // if (overlaysContext.registry = {};

  const open = (overlay: IOverlay<IAny>): Promise<unknown> => {
    overlaysGlobals.register(overlay);
    overlaysContext.dispatch({
      type: `${COMPONENT_ID}/open`,
      payload: overlay,
    });
    console.log('____OPEN', overlay);

    if (!overlaysGlobals.callbacks[overlay.id]) {
      // `!` tell ts that theResolve will be written before it is used
      let theResolve!: (args?: unknown) => void;
      // `!` tell ts that theResolve will be written before it is used
      let theReject!: (args?: unknown) => void;
      const promise = new Promise((resolve, reject) => {
        theResolve = resolve;
        theReject = reject;
      });
      overlaysGlobals.callbacks[overlay.id] = {
        resolve: theResolve,
        reject: theReject,
        promise,
      };

      return promise;
    }

    return overlaysGlobals.callbacks[overlay.id]!.promise;
  };

  const close = (overlayId: string): void => {
    overlaysContext.dispatch({
      type: `${COMPONENT_ID}/close`,
      payload: {
        id: overlayId,
      },
    });
    console.log('____CLOSE', overlayId);
  };

  return {
    open,
    close,
  };
};
