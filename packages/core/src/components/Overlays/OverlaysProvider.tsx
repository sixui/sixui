import { useMemo, useReducer } from 'react';

import type { IAny, IOmit } from '~/utils/types';
import type { IOverlaysContextValue } from './Overlays.context';
import type { IOverlayAction, IOverlaysInstances } from './Overlays.reducer';
import type { IOverlay } from './Overlays.types';
import { OverlaysContext } from './Overlays.context';
import { overlaysInitialInstances, overlaysReducer } from './Overlays.reducer';
import { OverlaysPlaceholder } from './OverlaysPlaceholder';

export interface IOverlaysProviderProps {
  children: React.ReactNode;
  layers?: Array<string>;
  state?: IOverlaysInstances;
  dispatch?: React.ActionDispatch<[action: IOverlayAction]>;
  overlays?: Record<string, IOmit<IOverlay<IAny>, 'id'>>;
}

export const OverlaysProvider: React.FC<IOverlaysProviderProps> = (props) => {
  const {
    children,
    layers = ['snackbars', 'dialogs', 'confirms', 'drawers'],
    state: stateProp,
    dispatch: dispatchProp,
  } = props;

  const [state, dispatch] = useReducer(
    overlaysReducer,
    overlaysInitialInstances,
  );

  const overlaysContextValue: IOverlaysContextValue = useMemo(
    () => ({
      instances: stateProp ?? state,
      dispatch: dispatchProp ?? dispatch,
      layers,
    }),
    [state, dispatch, layers, stateProp, dispatchProp],
  );

  return (
    <OverlaysContext.Provider value={overlaysContextValue}>
      {children}
      <OverlaysPlaceholder />
    </OverlaysContext.Provider>
  );
};
