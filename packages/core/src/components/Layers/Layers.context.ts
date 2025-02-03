import { createContext, useContext } from 'react';

import type { ILayersState } from './Layers.reducer';
import { layersInitialState } from './Layers.reducer';

export const LayersContext = createContext<ILayersState>(layersInitialState);

export const useLayersContext = (): ILayersState => {
  const context = useContext(LayersContext);

  return context;
};
