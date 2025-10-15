import { useCallback } from 'react';

import type { IAny } from '~/utils/types';
import type { IOverlayFC } from '../Overlays.types';
import { getUid } from '~/utils/getUid';
import { overlaysGlobals } from '../Overlays.globals';
import { useOverlaysDispatchContext } from '../OverlaysDispatch.context';
import { getOverlayId } from '../utils/getOverlayId';

export interface IUseOverlaysOpenResult {
  promise: Promise<unknown>;
  instanceId: string;
}

export interface IUseOverlaysResult {
  open: <TProps extends object>(
    overlayIdOrComponent: string | IOverlayFC<TProps>,
    props?: TProps & { instanceId?: string },
  ) => IUseOverlaysOpenResult;
  close: (instanceId: string) => void;
  closeAll: (options?: {
    id?: string | IOverlayFC<IAny>;
    layer?: string;
  }) => void;
  remove: (instanceId: string) => void;
}

export const useOverlays = (): IUseOverlaysResult => {
  const overlaysDispatchContext = useOverlaysDispatchContext();

  const open: IUseOverlaysResult['open'] = useCallback(
    (overlayIdOrComponent, props) => {
      const { instanceId: instanceIdProp, ...otherProps } = props ?? {};
      const overlayId = getOverlayId(overlayIdOrComponent);
      const instanceId = instanceIdProp || getUid(overlayId);

      const registeredOverlay = overlaysGlobals.registry[overlayId];
      if (!registeredOverlay) {
        throw new Error(
          'You try to open an overlay that has not been registered with `registerOverlay()`.',
        );
      }

      overlaysDispatchContext.dispatch({
        type: 'OPEN',
        payload: {
          overlayId,
          instanceId,
          props: otherProps,
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

      return {
        promise: overlaysGlobals.callbacks[instanceId].promise,
        instanceId,
      };
    },
    [overlaysDispatchContext],
  );

  const close: IUseOverlaysResult['close'] = useCallback(
    (instanceId) => {
      overlaysDispatchContext.dispatch({
        type: 'CLOSE',
        payload: {
          instanceId,
        },
      });
    },
    [overlaysDispatchContext],
  );

  const closeAll: IUseOverlaysResult['closeAll'] = useCallback(
    (options) => {
      const overlayId = options?.id ? getOverlayId(options.id) : undefined;

      overlaysDispatchContext.dispatch({
        type: 'CLOSE_ALL',
        payload: {
          overlayId,
          layer: options?.layer,
        },
      });
    },
    [overlaysDispatchContext],
  );

  const remove: IUseOverlaysResult['remove'] = useCallback(
    (instanceId): void => {
      overlaysDispatchContext.dispatch({
        type: 'REMOVE',
        payload: {
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
    closeAll,
    remove,
  };
};
