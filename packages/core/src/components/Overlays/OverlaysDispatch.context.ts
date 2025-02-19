import { createContext, useContext } from 'react';

import type { IOverlayAction } from './Overlays.reducer';

export interface IOverlaysDispatchContextValue {
  dispatch: React.ActionDispatch<[action: IOverlayAction]>;
}

export const OverlaysDispatchContext =
  createContext<IOverlaysDispatchContextValue>({
    dispatch: () => {
      throw new Error(
        `[@sixui/core] \`dispatch()\` not implemented. You forgot to wrap your component in <OverlaysProvider />.`,
      );
    },
  });

export const useOverlaysDispatchContext = (): IOverlaysDispatchContextValue => {
  const context = useContext(OverlaysDispatchContext);

  return context;
};
