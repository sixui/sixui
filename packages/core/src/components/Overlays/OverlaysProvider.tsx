import { useMemo, useReducer } from 'react';

import type { IOverlaysContextValue } from './Overlays.context';
import type { IOverlayAction, IOverlaysState } from './Overlays.reducer';
import { OverlaysContext } from './Overlays.context';
import { overlaysInitialState, overlaysReducer } from './Overlays.reducer';
import { OverlaysPlaceholder } from './OverlaysPlaceholder';

export interface IOverlaysProviderProps {
  children: React.ReactNode;
  layers?: Array<string>;
  state?: IOverlaysState;
  dispatch?: React.ActionDispatch<[action: IOverlayAction]>;
}

export const OverlaysProvider: React.FC<IOverlaysProviderProps> = (props) => {
  const {
    children,
    layers = ['snackbars', 'dialogs', 'confirms', 'drawers'],
    state: stateProp,
    dispatch: dispatchProp,
  } = props;

  const [state, dispatch] = useReducer(overlaysReducer, overlaysInitialState);

  const overlaysContextValue: IOverlaysContextValue = useMemo(
    () => ({
      state: stateProp ?? state,
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
