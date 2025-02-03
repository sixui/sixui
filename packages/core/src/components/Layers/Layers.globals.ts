import type { IAny } from '~/utils';
import type { ILayerAction } from './Layers.reducer';

type ILayersGlobals = {
  alreadyMounted: Record<string, boolean>;
  dispatch: React.ActionDispatch<[action: ILayerAction]>;
  registry: Record<
    string,
    {
      component: React.FC<IAny>;
      props?: Record<string, unknown>;
    }
  >;
};

export const layersGlobals: ILayersGlobals = {
  alreadyMounted: {},
  dispatch: () => {
    throw new Error(
      '[@sixui/core] No dispatch method detected. You forgot to wrap your component in <LayersProvider />.',
    );
  },
  registry: {},
};
