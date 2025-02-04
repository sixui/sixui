import { useCallback } from 'react';

import { useId } from '~/hooks';
import { useOverlayContext } from '../Overlay.context';
import { useOverlaysContext } from '../Overlays.context';
import { overlaysGlobals } from '../Overlays.globals';
import { useOverlays } from './useOverlays';

export interface IUseOverlayResult {
  id: string;
  opened: boolean;
  close: () => void;
  remove: () => void;
  resolve: (args?: unknown) => void;
  reject: (args?: unknown) => void;
}

export const useOverlay = (instanceId: string): IUseOverlayResult => {
  const overlaysContext = useOverlaysContext();
  const overlayContext = useOverlayContext();
  const id = useId();
  const overlays = useOverlays();

  const overlayId = overlayContext?.id || id;
  const overlayInstance = overlaysContext.instances[instanceId];

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
    id: overlayId,
    opened: overlayInstance?.opened || false,
    close: closeCallback,
    remove: removeCallback,
    resolve: resolveCallback,
    reject: rejectCallback,
  };
};
