import type { IAny } from '~/utils/types';
import type { IOverlay } from './Overlays.types';

export type IOverlaysRegistry = Record<string, IOverlay<IAny>>;

export type IOverlaysCallbacks = Record<
  string,
  {
    resolve: (args: unknown) => void;
    reject: (args: unknown) => void;
    promise: Promise<unknown>;
  }
>;

const register = (overlay: IOverlay<IAny>): void => {
  const registeredOverlay = overlaysGlobals.registry[overlay.overlayId];
  if (registeredOverlay) {
    // eslint-disable-next-line no-console
    console.warn(
      `[@sixui/core] Overlay with id \`${overlay.overlayId}\` already exists.`,
    );
  } else {
    overlaysGlobals.registry[overlay.overlayId] = overlay;
  }
};

interface IOverlaysGlobals {
  registry: IOverlaysRegistry;
  callbacks: IOverlaysCallbacks;
  register: typeof register;
}

export const overlaysGlobals: IOverlaysGlobals = {
  registry: {},
  callbacks: {},
  register,
};
