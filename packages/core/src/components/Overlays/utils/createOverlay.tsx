import type { IOverlayFC } from '../Overlays.types';
import { getUid } from '~/utils/getUid';
import { OverlayProvider } from '../Overlay.context';
import { OVERLAY_ID_SYMBOL } from '../Overlays.constants';
import { overlaysGlobals } from '../Overlays.globals';

type IOverlayFCProps<TProps extends Record<string, unknown>> = TProps & {
  instanceId: string;
};

export const createOverlay = <TProps extends Record<string, unknown>>(
  Component: React.ComponentType<IOverlayFCProps<TProps>>,
): React.FC<TProps & { instanceId: string }> => {
  const id = getUid();

  const Overlay: IOverlayFC<IOverlayFCProps<TProps>> & {
    [OVERLAY_ID_SYMBOL]: string;
  } = (props: IOverlayFCProps<TProps>) => (
    <OverlayProvider value={{ id }}>
      <Component {...props} />
    </OverlayProvider>
  );

  Overlay[OVERLAY_ID_SYMBOL] = id;

  overlaysGlobals.register({
    overlayId: id,
    component: Overlay,
    // FIXME: move layer
    layer: 'dialogs',
  });

  return Overlay;
};
