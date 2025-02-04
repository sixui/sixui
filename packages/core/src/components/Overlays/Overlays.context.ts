import { createContext, useContext } from 'react';

import type { IOverlayAction, IOverlaysState } from './Overlays.reducer';
import { overlaysInitialState } from './Overlays.reducer';

export interface IOverlaysContextValue {
  state: IOverlaysState;
  dispatch: React.ActionDispatch<[action: IOverlayAction]>;
  layers: Array<string>;
}

export const OverlaysContext = createContext<IOverlaysContextValue>({
  state: overlaysInitialState,
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
