import type { IDialogProps } from './Dialog.types';
import { registerOverlay, useOverlay } from '../Overlays';
import { Dialog } from './Dialog';
import { COMPONENT_NAME } from './Dialog.constants';

export const DialogOverlay = registerOverlay<IDialogProps>(
  (props) => {
    const { instanceId, ...other } = props;
    const overlay = useOverlay({ instanceId });

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
    layer: 'dialogs',
  },
);
