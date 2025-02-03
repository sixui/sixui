import { useId } from '~/hooks';
import { useOverlays } from './useOverlays';

export interface IUseOverlayProps {
  layer?: string;
}

export interface IUseOverlayResult {
  opened: boolean;
  close: () => void;
  remove: () => void;
}

export const useOverlay = (props?: IUseOverlayProps): IUseOverlayResult => {
  const overlays = useOverlays();
  const overlayId = useId();

  const overlayInfo = overlays.register(overlayId, props);

  return {
    opened: false,
    close: () => {},
    remove: () => {},
  };
};
