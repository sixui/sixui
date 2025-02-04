import { useCallback } from 'react';

import { useId } from '~/hooks';
import { useOverlayContext } from '../Overlay.context';
import { useOverlaysContext } from '../Overlays.context';
import { overlaysGlobals } from '../Overlays.globals';
import { useOverlays } from './useOverlays';

export interface IUseOverlayProps {
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

  const overlayId = overlayContext?.id || id;

  // const overlayInfo = overlays.register(overlayId);

  const overlayState = overlaysContext.state[overlayId];
  console.log('___state', overlayState);

  const closeCallback = useCallback(() => {
    overlays.close(overlayId);
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
    remove: () => {},
    resolve: resolveCallback,
    reject: rejectCallback,
  };
};
