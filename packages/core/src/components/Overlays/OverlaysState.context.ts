import { createContext, useContext } from 'react';

import type { IAny } from '~/utils/types';
import type { IOverlayInstance, IOverlaysInstances } from './Overlays.reducer';
import { overlaysInitialInstances } from './Overlays.reducer';

export type IOverlayLayer = string;

export type IOverlayInstancePosition = {
  index: number;
  count: number;
  isForeground: boolean;
};

export interface IOverlaysStateContextValue {
  instances: IOverlaysInstances;
  layers: Array<IOverlayLayer>;
  sortedInstances: Array<IOverlayInstance<IAny>>;
  getInstancePosition: (
    instanceId: string,
    options?: { layer?: string; opened?: boolean },
  ) => IOverlayInstancePosition;
}

export const OverlaysStateContext = createContext<IOverlaysStateContextValue>({
  instances: overlaysInitialInstances,
  layers: [],
  sortedInstances: [],
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
