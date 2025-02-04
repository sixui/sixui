import { createContext, useContext } from 'react';

import type { IOverlayAction, IOverlaysInstances } from './Overlays.reducer';
import { overlaysInitialInstances } from './Overlays.reducer';

export interface IOverlaysContextValue {
  instances: IOverlaysInstances;
  dispatch: React.ActionDispatch<[action: IOverlayAction]>;
  layers: Array<string>;
}

export const OverlaysContext = createContext<IOverlaysContextValue>({
  instances: overlaysInitialInstances,
  dispatch: () => {
    throw new Error(
      '[@sixui/core] No dispatch method detected. You forgot to wrap your component in <OverlaysProvider />.',
    );
  },
  layers: [],
});

export const useOverlaysContext = (): IOverlaysContextValue => {
  const context = useContext(OverlaysContext);

  return context;
};
