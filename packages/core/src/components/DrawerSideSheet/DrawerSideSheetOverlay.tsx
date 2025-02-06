import type { IDrawerSideSheetProps } from './DrawerSideSheet.types';
import { registerOverlay, useOverlayInstance } from '~/components/Overlays';
import { DrawerSideSheet } from './DrawerSideSheet';
import { COMPONENT_NAME, OVERLAY_LAYER } from './DrawerSideSheet.constants';

export const DrawerSideSheetOverlay = registerOverlay<IDrawerSideSheetProps>(
  (props) => {
    const { instanceId, ...other } = props;
    const overlay = useOverlayInstance(instanceId);

    return (
      <DrawerSideSheet
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
