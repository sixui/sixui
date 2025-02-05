import type { ISnackbarProps } from './Snackbar.types';
import { registerOverlay, useOverlay } from '../Overlays';
import { Snackbar } from './Snackbar';
import { COMPONENT_NAME } from './Snackbar.constants';

export const SnackbarOverlay = registerOverlay<ISnackbarProps>(
  (props) => {
    const { instanceId, ...other } = props;
    const overlay = useOverlay({ instanceId });

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
    layer: 'snackbars',
  },
);
