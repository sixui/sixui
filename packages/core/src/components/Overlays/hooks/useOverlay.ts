import { useCallback } from 'react';

import { getUid } from '~/utils';
import { useOverlayContext } from '../Overlay.context';
import { overlaysGlobals } from '../Overlays.globals';
import { useOverlaysStateContext } from '../OverlaysState.context';
import { useOverlays } from './useOverlays';

export interface IUseOverlayProps {
  instanceId: string;
}

export interface IUseOverlayResult {
  overlayId: string;
  opened: boolean;
  close: () => void;
  remove: () => void;
  resolve: (args?: unknown) => void;
  reject: (args?: unknown) => void;
}

export const useOverlay = (props: IUseOverlayProps): IUseOverlayResult => {
  const { instanceId } = props;

  const overlaysContext = useOverlaysStateContext();
  const overlayContext = useOverlayContext();
  const overlays = useOverlays();

  const overlayId = overlayContext?.overlayId || getUid();
  const overlayInstance = instanceId
    ? overlaysContext.instances[instanceId]
    : undefined;

  const closeCallback = useCallback(() => {
    overlays.close(overlayId, instanceId);
  }, [overlays, overlayId, instanceId]);

  const removeCallback = useCallback(() => {
    overlays.remove(overlayId, instanceId);
  }, [overlays, overlayId, instanceId]);

  const resolveCallback = useCallback(
    (args?: unknown) => {
      overlaysGlobals.callbacks[instanceId]?.resolve(args);
    },
    [instanceId],
  );

  const rejectCallback = useCallback(
    (args?: unknown) => {
      overlaysGlobals.callbacks[instanceId]?.reject(args);
    },
    [instanceId],
  );

  return {
    overlayId,
    opened: overlayInstance?.opened || false,
    close: closeCallback,
    remove: removeCallback,
    resolve: resolveCallback,
    reject: rejectCallback,
  };
};
