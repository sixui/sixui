import type { IUseWindowSizeClassResult } from '~/hooks/useWindowSizeClass';
import type { IAppLayoutNavigationMode } from './AppLayout.types';

export const resolveNavigationMode = (
  windowSizeClass: IUseWindowSizeClassResult | undefined,
  preferredNavigationMode: IAppLayoutNavigationMode,
): IAppLayoutNavigationMode => {
  if (windowSizeClass?.compact) {
    return 'bar';
  }

  if (windowSizeClass?.medium) {
    return 'rail';
  }

  if (windowSizeClass?.expanded) {
    return 'rail';
  }

  return preferredNavigationMode;
};
