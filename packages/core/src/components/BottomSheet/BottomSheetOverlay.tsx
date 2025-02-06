import type { IBottomSheetProps } from './BottomSheet.types';
import { registerOverlay, useOverlayInstance } from '~/components/Overlays';
import { BottomSheet } from './BottomSheet';
import { COMPONENT_NAME, OVERLAY_LAYER } from './BottomSheet.constants';

export const BottomSheetOverlay = registerOverlay<IBottomSheetProps>(
  (props) => {
    const { instanceId, ...other } = props;
    const overlay = useOverlayInstance(instanceId);

    return (
      <BottomSheet
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
