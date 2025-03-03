import { kebabCaseFromCamelCase } from '~/utils/kebabCaseFromCamelCase';

export const COMPONENT_NAME = 'Overlays';
export const COMPONENT_ID = `sixui-${kebabCaseFromCamelCase(COMPONENT_NAME)}`;
export const OVERLAY_ID_SYMBOL = Symbol('OverlayId');
