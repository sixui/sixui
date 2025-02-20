import type { IConfirmDialogProps } from './ConfirmDialog.types';
import { registerOverlay, useOverlayInstance } from '~/components/Overlays';
import { ConfirmDialog } from './ConfirmDialog';
import { COMPONENT_NAME, OVERLAY_LAYER } from './ConfirmDialog.constants';

export type IConfirmDialogOverlayProps = IConfirmDialogProps;

export const ConfirmDialogOverlay = registerOverlay<IConfirmDialogOverlayProps>(
  (props) => {
    const { instanceId, onClose, onCancel, onConfirm, ...other } = props;
    const overlay = useOverlayInstance(instanceId);

    return (
      <ConfirmDialog
        {...other}
        opened={overlay.opened}
        onClose={() => {
          onClose?.();
          overlay.close();
          // The promise won't be rejected if it has already been resolved.
          overlay.reject();
        }}
        onCancel={() =>
          Promise.resolve()
            .then(() => onCancel?.())
            .then(() => {
              overlay.resolve(false);
            })
            .catch(overlay.reject)
        }
        onConfirm={() =>
          Promise.resolve()
            .then(() => onConfirm?.())
            .then(() => {
              overlay.resolve(true);
            })
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
