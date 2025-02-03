import type { ILayerAction, ILayersState } from './Layers.reducer';
import { LayersContext } from './Layers.context';
import { layersGlobals } from './Layers.globals';
import { LayersPlaceholder } from './LayersPlaceholder';
import { LayersStatefulProvider } from './LayersStatefulProvider';

export interface ILayersProviderProps {
  children: React.ReactNode;
  state?: ILayersState;
  dispatch?: React.ActionDispatch<[action: ILayerAction]>;
}

export const LayersProvider: React.FC<ILayersProviderProps> = (props) => {
  const { children, state, dispatch } = props;

  if (!state || !dispatch) {
    return <LayersStatefulProvider>{children}</LayersStatefulProvider>;
  }

  layersGlobals.dispatch = dispatch;

  return (
    <LayersContext.Provider value={state}>
      {children}
      <LayersPlaceholder />
    </LayersContext.Provider>
  );
};
