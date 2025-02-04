import { createOptionalContext } from '~/utils/react';

export type IOverlayContext = {
  id: string;
};

export const [OverlayProvider, useOverlayContext] =
  createOptionalContext<IOverlayContext>();
