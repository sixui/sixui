import type { IDrawerSideSheetProps } from '~/components/DrawerSideSheet';
import { DrawerSideSheet } from '~/components/DrawerSideSheet';
import { registerOverlay, useOverlayInstance } from '~/components/Overlays';
import { COMPONENT_NAME, OVERLAY_LAYER } from './SideSheet.constants';

export type ISideSheetOverlayProps = IDrawerSideSheetProps;

export const SideSheetOverlay = registerOverlay<ISideSheetOverlayProps>(
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
        withoutPortal
      />
    );
  },
  {
    id: COMPONENT_NAME,
    layer: OVERLAY_LAYER,
  },
);
