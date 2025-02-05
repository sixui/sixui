import type { ISnackbarProps } from './Snackbar.types';
import { registerOverlay, useOverlayInstance } from '../Overlays';
import { Snackbar } from './Snackbar';
import { COMPONENT_NAME, OVERLAY_LAYER } from './Snackbar.constants';

export const SnackbarOverlay = registerOverlay<ISnackbarProps>(
  (props) => {
    const { instanceId, ...other } = props;
    const overlay = useOverlayInstance(instanceId);

    return (
      <Snackbar
        {...other}
        opened={overlay.opened}
        onClose={() => {
          overlay.close();
          overlay.resolve();
        }}
        onClosed={() => {
          overlay.remove();
        }}
      />
    );
  },
  {
    id: COMPONENT_NAME,
    layer: OVERLAY_LAYER,
  },
);
