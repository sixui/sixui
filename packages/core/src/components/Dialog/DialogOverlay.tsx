import type { IDialogProps } from './Dialog.types';
import { registerOverlay, useOverlayInstance } from '~/components/Overlays';
import { Dialog } from './Dialog';
import { COMPONENT_NAME, OVERLAY_LAYER } from './Dialog.constants';

export const DialogOverlay = registerOverlay<IDialogProps>(
  (props) => {
    const { instanceId, onClose, ...other } = props;
    const overlay = useOverlayInstance(instanceId);

    return (
      <Dialog
        {...other}
        opened={overlay.opened}
        onClose={() => {
          onClose?.();
          overlay.close();
          overlay.resolve();
        }}
        onClosed={() => {
          overlay.remove();
        }}
        withoutPortal
      />
    );
  },
  {
    id: COMPONENT_NAME,
    layer: OVERLAY_LAYER,
  },
);
