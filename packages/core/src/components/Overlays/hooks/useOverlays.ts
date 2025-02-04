import { useCallback } from 'react';

import type { IOverlayFC } from '../Overlays.types';
import { getUid } from '~/utils';
import { COMPONENT_ID } from '../Overlays.constants';
import { useOverlaysContext } from '../Overlays.context';
import { overlaysGlobals } from '../Overlays.globals';
import { getOverlayId } from '../utils/getOverlayId';

export interface IUseOverlaysResult {
  open: <TProps extends Record<string, unknown>>(
    idOrComponent: string | IOverlayFC<TProps>,
    props: TProps,
  ) => Promise<unknown>;
  close: (overlayId: string, instanceId: string) => void;
  remove: (overlayId: string, instanceId: string) => void;
}

export const useOverlays = (): IUseOverlaysResult => {
  const overlaysContext = useOverlaysContext();

  const open: IUseOverlaysResult['open'] = useCallback(
    (idOrComponent, props): Promise<unknown> => {
      const overlayId = getOverlayId(idOrComponent);
      const instanceId = getUid();

      const registeredOverlay = overlaysGlobals.registry[overlayId];
      if (!registeredOverlay) {
        throw new Error('Overlay is not registered');
      }

      overlaysContext.dispatch({
        type: `${COMPONENT_ID}/open`,
        payload: {
          overlayId,
          instanceId,
          props: props,
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
    [overlaysContext],
  );

  const close = useCallback(
    (overlayId: string, instanceId: string): void => {
      overlaysContext.dispatch({
        type: `${COMPONENT_ID}/close`,
        payload: {
          overlayId,
          instanceId,
        },
      });
    },
    [overlaysContext],
  );

  const remove = useCallback(
    (overlayId: string, instanceId: string): void => {
      overlaysContext.dispatch({
        type: `${COMPONENT_ID}/remove`,
        payload: {
          overlayId,
          instanceId,
        },
      });

      delete overlaysGlobals.callbacks[instanceId];
    },
    [overlaysContext],
  );

  return {
    open,
    close,
    remove,
  };
};
