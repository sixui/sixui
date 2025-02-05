import { createContext, useContext } from 'react';

import type { IOverlaysInstances } from './Overlays.reducer';
import { overlaysInitialInstances } from './Overlays.reducer';

export interface IOverlaysStateContextValue {
  instances: IOverlaysInstances;
  layers: Array<string>;
  getInstancePosition: (instanceId: string, layer?: string) => number;
}

export const OverlaysStateContext = createContext<IOverlaysStateContextValue>({
  instances: overlaysInitialInstances,
  layers: [],
  getInstancePosition: () => {
    throw new Error(
      '[@sixui/core] `getInstancePosition()` not implemented. You forgot to wrap your component in <OverlaysProvider />.',
    );
  },
});

export const useOverlaysStateContext = (): IOverlaysStateContextValue => {
  const context = useContext(OverlaysStateContext);

  return context;
};
