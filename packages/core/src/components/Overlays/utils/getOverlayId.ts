import type { IAny } from '~/utils/types';
import type { IOverlay } from '../Overlays.types';
import { getUid } from '~/utils/getUid';
import { OVERLAY_ID_SYMBOL } from '../Overlays.constants';

export const getOverlayId = (overlay: IOverlay<IAny>): string =>
  overlay.id || overlay.component[OVERLAY_ID_SYMBOL] || getUid();
