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
  const overlayId = overlay.id || 'yyy';
  console.log('_______REGISTER', overlayId, overlay);
  if (overlaysGlobals.registry[overlayId]) {
    Object.assign(overlaysGlobals.registry[overlayId], {
      layer: overlay.layer,
      props: overlay.props,
    });
  } else {
    overlaysGlobals.registry[overlayId] = {
      ...overlay,
      id: overlayId,
    };
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
