import { useCallback, useMemo, useReducer } from 'react';

import type { IOverlayAction, IOverlaysInstances } from './Overlays.reducer';
import type {
  IOverlayLayer,
  IOverlaysStateContextValue,
} from './OverlaysState.context';
import { overlaysInitialInstances, overlaysReducer } from './Overlays.reducer';
import {
  IOverlaysDispatchContextValue,
  OverlaysDispatchContext,
} from './OverlaysDispatch.context';
import { OverlaysPlaceholder } from './OverlaysPlaceholder';
import { OverlaysStateContext } from './OverlaysState.context';
import { getSortedRenderableOverlays } from './utils/getSortedRenderableOverlays';

export interface IOverlaysProviderProps {
  children: React.ReactNode;
  layers?: Array<IOverlayLayer>;
  instances?: IOverlaysInstances;
  dispatch?: React.ActionDispatch<[action: IOverlayAction]>;
}

export const OverlaysProvider: React.FC<IOverlaysProviderProps> = (props) => {
  const {
    children,
    layers = ['drawers', 'dialogs', 'alerts', 'snackbar'],
    instances: instancesProp,
    dispatch: dispatchProp,
  } = props;

  const internalReducer = useReducer(overlaysReducer, overlaysInitialInstances);

  const instances = instancesProp ?? internalReducer[0];
  const dispatch = dispatchProp ?? internalReducer[1];
  const sortedInstances = getSortedRenderableOverlays(instances, layers);

  const getInstancePosition: IOverlaysStateContextValue['getInstancePosition'] =
    useCallback(
      (instanceId, options) => {
        const overlayInstanceIds = Object.values(sortedInstances)
          .filter(
            (instance) =>
              (options?.opened === undefined ||
                options.opened === instance.opened) &&
              (options?.layer === undefined ||
                instance.layer === options.layer),
          )
          .map(({ instanceId }) => instanceId);
        const count = overlayInstanceIds.length;
        const index = overlayInstanceIds.indexOf(instanceId);
        const isForeground = index === count - 1;

        return { index, count, isForeground };
      },
      [sortedInstances],
    );

  const overlaysStateContextValue: IOverlaysStateContextValue = useMemo(
    () => ({
      instances,
      layers,
      sortedInstances,
      getInstancePosition,
    }),
    [instances, layers, sortedInstances, getInstancePosition],
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
