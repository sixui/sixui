import type { IAny } from '~/utils';
import type { IOverlayAction } from './Overlays.reducer';

type IOverlaysCallbacks = Record<
  string,
  {
    resolve: (args: unknown) => void;
    reject: (args: unknown) => void;
    promise: Promise<unknown>;
  }
>;

type IOverlaysGlobals = {
  alreadyMounted: Record<string, boolean>;
  dispatch: React.ActionDispatch<[action: IOverlayAction]>;
  registry: Record<
    string,
    {
      component: React.FC<IAny>;
      props?: Record<string, unknown>;
    }
  >;
  callbacks: IOverlaysCallbacks;
  hideCallbacks: IOverlaysCallbacks;
};

export const overlaysGlobals: IOverlaysGlobals = {
  alreadyMounted: {},
  dispatch: () => {
    throw new Error(
      '[@sixui/core] No dispatch method detected. You forgot to wrap your component in <OverlaysProvider />.',
    );
  },
  registry: {},
  callbacks: {},
  hideCallbacks: {},
};
