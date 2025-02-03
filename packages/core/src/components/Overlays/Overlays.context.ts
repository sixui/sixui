import { createContext, useContext } from 'react';

import type { IAny } from '~/utils/types';
import type { IOverlayAction, IOverlaysState } from './Overlays.reducer';
import type { IOverlay } from './Overlays.types';
import { overlaysInitialState } from './Overlays.reducer';

export type IOverlaysRegistry = Record<string, IOverlay<IAny>>;

export interface IOverlaysContextValue {
  state: IOverlaysState;
  dispatch: React.ActionDispatch<[action: IOverlayAction]>;
  registry: IOverlaysRegistry;
  layers: Array<string>;
}

export const OverlaysContext = createContext<IOverlaysContextValue>({
  state: overlaysInitialState,
  dispatch: () => {
    throw new Error(
      '[@sixui/core] No dispatch method detected. You forgot to wrap your component in <OverlaysProvider />.',
    );
  },
  registry: {},
  layers: [],
});

export const useOverlaysContext = (): IOverlaysContextValue => {
  const context = useContext(OverlaysContext);

  return context;
};
