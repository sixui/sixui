import { dashedCaseFromCamelCase } from '~/utils';

export const COMPONENT_NAME = 'Overlays';
export const COMPONENT_ID = `sixui-${dashedCaseFromCamelCase(COMPONENT_NAME)}`;
export const OVERLAY_ID_SYMBOL = Symbol('OverlayId');
