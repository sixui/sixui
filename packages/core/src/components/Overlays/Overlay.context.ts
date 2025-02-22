import { createOptionalContext } from '~/utils/react';

export type IOverlayContext = {
  overlayId: string;
  instanceId: string;
};

export const [OverlayProvider, useOverlayContext] =
  createOptionalContext<IOverlayContext>();
