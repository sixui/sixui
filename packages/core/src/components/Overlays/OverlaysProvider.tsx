import { useMemo, useReducer } from 'react';

import type { IAny, IOmit } from '~/utils/types';
import type { IOverlayAction, IOverlaysInstances } from './Overlays.reducer';
import type { IOverlay } from './Overlays.types';
import type { IOverlaysStateContextValue } from './OverlaysState.context';
import { overlaysInitialInstances, overlaysReducer } from './Overlays.reducer';
import {
  IOverlaysDispatchContextValue,
  OverlaysDispatchContext,
} from './OverlaysDispatch.context';
import { OverlaysPlaceholder } from './OverlaysPlaceholder';
import { OverlaysStateContext } from './OverlaysState.context';

export interface IOverlaysProviderProps {
  children: React.ReactNode;
  layers?: Array<string>;
  instances?: IOverlaysInstances;
  dispatch?: React.ActionDispatch<[action: IOverlayAction]>;
  overlays?: Record<string, IOmit<IOverlay<IAny>, 'overlayId'>>;
}

export const OverlaysProvider: React.FC<IOverlaysProviderProps> = (props) => {
  const {
    children,
    layers = ['snackbars', 'dialogs', 'confirms', 'drawers'],
    instances: instancesProp,
    dispatch: dispatchProp,
    // DEV:
    overlays,
  } = props;

  const internalReducer = useReducer(overlaysReducer, overlaysInitialInstances);

  const instances = instancesProp ?? internalReducer[0];
  const dispatch = dispatchProp ?? internalReducer[1];

  const overlaysStateContextValue: IOverlaysStateContextValue = useMemo(
    () => ({ instances, layers }),
    [instances, layers],
  );

  const overlaysDispatchContextValue: IOverlaysDispatchContextValue = useMemo(
    () => ({ dispatch }),
    [dispatch],
  );

  return (
    <OverlaysStateContext.Provider value={overlaysStateContextValue}>
      <OverlaysDispatchContext.Provider value={overlaysDispatchContextValue}>
        {children}
        <OverlaysPlaceholder />
      </OverlaysDispatchContext.Provider>
    </OverlaysStateContext.Provider>
  );
};
