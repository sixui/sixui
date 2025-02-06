import type { IDialogProps } from './Dialog.types';
import { registerOverlay, useOverlayInstance } from '~/components/Overlays';
import { Dialog } from './Dialog';
import { COMPONENT_NAME, OVERLAY_LAYER } from './Dialog.constants';

export const DialogOverlay = registerOverlay<IDialogProps>(
  (props) => {
    const { instanceId, ...other } = props;
    const overlay = useOverlayInstance(instanceId);

    return (
      <Dialog
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
