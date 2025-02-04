import type { IAny } from '~/utils/types';
import type { IOverlayFC } from '../Overlays.types';
import { getUid } from '~/utils/getUid';
import { OVERLAY_ID_SYMBOL } from '../Overlays.constants';

export const getOverlayId = (
  idOrComponent: string | IOverlayFC<IAny>,
): string =>
  typeof idOrComponent === 'string'
    ? idOrComponent
    : idOrComponent[OVERLAY_ID_SYMBOL] || getUid();
