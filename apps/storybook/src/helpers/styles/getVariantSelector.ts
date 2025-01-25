import { getModifierSelector } from './getModifierSelector';

export const getVariantSelector = (
  variant: string,
  selector?: string,
): string => getModifierSelector(`variant="${variant}"`, selector);
