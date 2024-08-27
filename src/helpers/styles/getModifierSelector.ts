export const getModifierSelector = (
  modifier: string,
  selector?: string,
): string =>
  `${selector ?? '&'}:where([data-${modifier}])${selector ? ' &' : ''}`;
