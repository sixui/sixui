import type { IConfirmDialogProps } from './ConfirmDialog.types';
import { registerOverlay, useOverlayInstance } from '../Overlays';
import { ConfirmDialog } from './ConfirmDialog';
import { COMPONENT_NAME, OVERLAY_LAYER } from './ConfirmDialog.constants';

export const ConfirmDialogOverlay = registerOverlay<IConfirmDialogProps>(
  (props) => {
    const { instanceId, onCancel, onConfirm, ...other } = props;
    const overlay = useOverlayInstance(instanceId);

    return (
      <ConfirmDialog
        {...other}
        opened={overlay.opened}
        onClose={() => {
          overlay.close();
          // The promise won't be rejected if it has already been resolved.
          overlay.reject();
        }}
        onCancel={() =>
          Promise.resolve()
            .then(() => onCancel?.())
            .then(() => {
              overlay.reject();
            })
            .catch(overlay.reject)
        }
        onConfirm={() =>
          Promise.resolve()
            .then(() => onConfirm?.())
            .then(overlay.resolve)
            .catch(overlay.reject)
        }
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
