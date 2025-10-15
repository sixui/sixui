import type { IBottomSheetProps } from './BottomSheet.types';
import { registerOverlay, useOverlayInstance } from '~/components/Overlays';
import { BottomSheet } from './BottomSheet';
import { COMPONENT_NAME, OVERLAY_LAYER } from './BottomSheet.constants';

export type IBottomSheetOverlayProps = IBottomSheetProps;

export const BottomSheetOverlay = registerOverlay<IBottomSheetOverlayProps>(
  (props) => {
    const { instanceId, onClose, onClosed, ...other } = props;
    const overlay = useOverlayInstance(instanceId);

    return (
      <BottomSheet
        {...other}
        opened={overlay.opened}
        onClose={() => {
          onClose?.();
          overlay.close();
          overlay.resolve();
        }}
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
