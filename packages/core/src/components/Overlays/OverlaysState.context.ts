import { createContext, useContext } from 'react';

import type { IOverlaysInstances } from './Overlays.reducer';
import { overlaysInitialInstances } from './Overlays.reducer';

export interface IOverlaysStateContextValue {
  instances: IOverlaysInstances;
  layers: Array<string>;
}

export const OverlaysStateContext = createContext<IOverlaysStateContextValue>({
  instances: overlaysInitialInstances,
  layers: [],
});

export const useOverlaysStateContext = (): IOverlaysStateContextValue => {
  const context = useContext(OverlaysStateContext);

  return context;
};
