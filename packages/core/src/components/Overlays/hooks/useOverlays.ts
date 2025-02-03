import type { IOverlay } from '../Overlays.types';
import { type IAny } from '~/utils';
import { COMPONENT_ID } from '../Overlays.constants';
import { useOverlaysContext } from '../Overlays.context';

export interface IUseOverlaysResult {
  show: <TProps extends object>(overlay: IOverlay<TProps>) => void;
}

export const useOverlays = (): IUseOverlaysResult => {
  const overlaysContext = useOverlaysContext();

  // if (overlaysContext.registry = {};

  const register = (overlay: IOverlay<IAny>): void => {
    const overlayId = overlay.id || 'yyy';
    console.log('_______REGISTER', overlayId, overlay);
    if (overlaysContext.registry[overlayId]) {
      Object.assign(overlaysContext.registry[overlayId], {
        layer: overlay.layer,
        props: overlay.props,
      });
    } else {
      overlaysContext.registry[overlayId] = {
        ...overlay,
        id: overlayId,
      };
    }
  };

  return {
    show: (overlay) => {
      register(overlay);
      overlaysContext.dispatch({
        type: `${COMPONENT_ID}/show`,
        payload: overlay,
      });
      console.log('____SHOW', overlay);
    },
  };
};
