import { useReducer } from 'react';

import { LayersContext } from './Layers.context';
import { layersGlobals } from './Layers.globals';
import { layersInitialState, layersReducer } from './Layers.reducer';
import { LayersPlaceholder } from './LayersPlaceholder';

export interface ILayersStatefulProviderProps {
  children: React.ReactNode;
}

export const LayersStatefulProvider: React.FC<ILayersStatefulProviderProps> = (
  props,
) => {
  const { children } = props;

  const [state, dispatch] = useReducer(layersReducer, layersInitialState);

  layersGlobals.dispatch = dispatch;

  return (
    <LayersContext.Provider value={state}>
      {children}
      <LayersPlaceholder />
    </LayersContext.Provider>
  );
};
