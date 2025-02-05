import { useCallback } from 'react';

import type { IOverlayFC } from '../Overlays.types';
import { getUid } from '~/utils';
import { COMPONENT_ID } from '../Overlays.constants';
import { overlaysGlobals } from '../Overlays.globals';
import { useOverlaysDispatchContext } from '../OverlaysDispatch.context';
import { getOverlayId } from '../utils/getOverlayId';

export interface IUseOverlaysResult {
  open: <TProps extends object>(
    idOrComponent: string | IOverlayFC<TProps>,
    props: TProps,
  ) => Promise<unknown>;
  close: (overlayId: string, instanceId: string) => void;
  remove: (overlayId: string, instanceId: string) => void;
}

export const useOverlays = (): IUseOverlaysResult => {
  const overlaysDispatchContext = useOverlaysDispatchContext();

  const open: IUseOverlaysResult['open'] = useCallback(
    (idOrComponent, props): Promise<unknown> => {
      const overlayId = getOverlayId(idOrComponent);
      const instanceId = getUid(overlayId);

      const registeredOverlay = overlaysGlobals.registry[overlayId];
      if (!registeredOverlay) {
        throw new Error(
          'You try to open an overlay that has not been registered with `registerOverlay()`.',
        );
      }

      overlaysDispatchContext.dispatch({
        type: `${COMPONENT_ID}/open`,
        payload: {
          overlayId,
          instanceId,
          props,
          layer: registeredOverlay.layer,
        },
      });

      if (!overlaysGlobals.callbacks[instanceId]) {
        // `!` tell ts that theResolve will be written before it is used
        let theResolve!: (args?: unknown) => void;
        // `!` tell ts that theResolve will be written before it is used
        let theReject!: (args?: unknown) => void;
        const promise = new Promise((resolve, reject) => {
          theResolve = resolve;
          theReject = reject;
        });
        overlaysGlobals.callbacks[instanceId] = {
          resolve: theResolve,
          reject: theReject,
          promise,
        };
      }

      return overlaysGlobals.callbacks[instanceId].promise;
    },
    [overlaysDispatchContext],
  );

  const close = useCallback(
    (overlayId: string, instanceId: string): void => {
      overlaysDispatchContext.dispatch({
        type: `${COMPONENT_ID}/close`,
        payload: {
          overlayId,
          instanceId,
        },
      });
    },
    [overlaysDispatchContext],
  );

  const remove = useCallback(
    (overlayId: string, instanceId: string): void => {
      overlaysDispatchContext.dispatch({
        type: `${COMPONENT_ID}/remove`,
        payload: {
          overlayId,
          instanceId,
        },
      });

      delete overlaysGlobals.callbacks[instanceId];
    },
    [overlaysDispatchContext],
  );

  return {
    open,
    close,
    remove,
  };
};
