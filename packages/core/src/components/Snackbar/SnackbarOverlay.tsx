import type { ISnackbarProps } from './Snackbar.types';
import { registerOverlay, useOverlayInstance } from '~/components/Overlays';
import { Snackbar } from './Snackbar';
import { COMPONENT_NAME, OVERLAY_LAYER } from './Snackbar.constants';

export type ISnackbarOverlayProps = ISnackbarProps;

export const SnackbarOverlay = registerOverlay<ISnackbarOverlayProps>(
  (props) => {
    const { instanceId, onClose, onClosed, onActionClick, ...other } = props;
    const overlay = useOverlayInstance(instanceId);

    return (
      <Snackbar
        {...other}
        opened={overlay.opened}
        onClose={() => {
          onClose?.();
          overlay.close();
          overlay.resolve();
        }}
        onActionClick={() =>
          Promise.resolve()
            .then(() => onActionClick?.())
            .then(overlay.resolve)
            .catch(overlay.reject)
        }
        onClosed={() => {
          onClosed?.();
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
