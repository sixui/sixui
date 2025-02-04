import { createSafeContext } from '~/utils/react';

export type IOverlayContext = {
  overlayId: string;
};

export const [OverlayProvider, useOverlayContext] =
  createSafeContext<IOverlayContext>(
    'You forgot to wrap your component in <OverlayProvider />.',
  );
