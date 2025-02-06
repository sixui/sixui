import { removeUndefineds } from '@olivierpascal/helpers';

import type { IAny } from '~/utils/types';
import type { IOverlay, IOverlayUpdate } from './Overlays.types';

type IOverlaysRegistry = Record<string, IOverlay<IAny>>;

type IOverlaysCallbacks = Record<
  string,
  {
    resolve: (args: unknown) => void;
    reject: (args: unknown) => void;
    promise: Promise<unknown>;
  }
>;

interface IOverlaysGlobals {
  registry: IOverlaysRegistry;
  callbacks: IOverlaysCallbacks;
  update: (id: string, overlay: IOverlayUpdate<IAny>) => void;
  register: (id: string, overlay: IOverlay<IAny>) => void;
}

const update = (id: string, overlay: IOverlayUpdate<IAny>): void => {
  const registeredOverlay = overlaysGlobals.registry[id];
  if (registeredOverlay) {
    Object.assign(
      registeredOverlay,
      removeUndefineds({
        props: overlay.props,
        layer: overlay.layer,
      }),
    );
  } else {
    // eslint-disable-next-line no-console
    console.warn(`[@sixui/core] Overlay with id \`${id}\` does not exist.`);
  }
};

const register = (id: string, overlay: IOverlay<IAny>): void => {
  const registeredOverlay = overlaysGlobals.registry[id];

  if (registeredOverlay) {
    update(id, overlay);
  } else {
    overlaysGlobals.registry[id] = overlay;
  }
};

export const overlaysGlobals: IOverlaysGlobals = {
  registry: {},
  callbacks: {},
  register,
  update,
};
