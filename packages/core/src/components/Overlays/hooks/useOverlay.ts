import { useCallback } from 'react';

import { useId } from '~/hooks';
import { useOverlayContext } from '../Overlay.context';
import { useOverlaysContext } from '../Overlays.context';
import { overlaysGlobals } from '../Overlays.globals';
import { useOverlays } from './useOverlays';

export interface IUseOverlayProps {
  id?: string;
  layer?: string;
}

export interface IUseOverlayResult {
  id: string;
  opened: boolean;
  close: () => void;
  remove: () => void;
  resolve: (args?: unknown) => void;
  reject: (args?: unknown) => void;
}

export const useOverlay = (props?: IUseOverlayProps): IUseOverlayResult => {
  const overlaysContext = useOverlaysContext();
  const overlayContext = useOverlayContext();
  const id = useId();
  const overlays = useOverlays();

  const overlayId = props?.id || overlayContext?.id || id;
  const overlayState = overlaysContext.state[overlayId];

  const closeCallback = useCallback(() => {
    overlays.close(overlayId);
  }, [overlays, overlayId]);

  const removeCallback = useCallback(() => {
    overlays.remove(overlayId);
  }, [overlays, overlayId]);

  const resolveCallback = useCallback(
    (args?: unknown) => {
      overlaysGlobals.callbacks[overlayId]?.resolve(args);
    },
    [overlayId],
  );

  const rejectCallback = useCallback(
    (args?: unknown) => {
      overlaysGlobals.callbacks[overlayId]?.reject(args);
    },
    [overlayId],
  );

  return {
    id: overlayId,
    opened: overlayState?.opened || false,
    close: closeCallback,
    remove: removeCallback,
    resolve: resolveCallback,
    reject: rejectCallback,
  };
};
