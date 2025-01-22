import type { IOrientation } from '~/helpers/types';
import {
  IUseWindowSizeClassResult,
  useWindowSizeClass,
} from '~/hooks/useWindowSizeClass';

export type ICanonicalLayoutType = 'listDetail' | 'supportingPane' | 'feed';
export type ICanonicalLayoutNavigationMode = 'bar' | 'rail' | 'standard';
export type ICanonicalLayoutPreferredNavigationMode = 'rail' | 'standard';

export type ICanonicalLayoutOptions = {
  window?: Window;
  dense?: boolean;
  preferredNavigationMode?: ICanonicalLayoutPreferredNavigationMode;
};

export type ICanonicalLayoutPane = {
  name: 'listDetail' | 'list' | 'detail' | 'focus' | 'supporting' | 'feed';
  type?: 'body' | 'bottomSheet' | 'aside';
  dismissible?: boolean;
};

export type ICanonicalLayout = {
  windowSizeClass: IUseWindowSizeClassResult | undefined;
  navigationMode: ICanonicalLayoutNavigationMode;
  orientation?: IOrientation;
  panes: Array<ICanonicalLayoutPane>;
  standardAside?: {
    maxWidth?: number;
  };
};

const defaultOptions = {
  preferredNavigationMode: 'standard' as 'rail' | 'standard',
};

const getNavigationMode = (
  windowSizeClass: IUseWindowSizeClassResult | undefined,
  preferredNavigationMode: ICanonicalLayoutPreferredNavigationMode,
): ICanonicalLayoutNavigationMode => {
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

export const useCanonicalLayout = (
  layout: ICanonicalLayoutType,
  optionsProp?: ICanonicalLayoutOptions,
): ICanonicalLayout => {
  const options = {
    ...defaultOptions,
    ...optionsProp,
  };
  const windowSizeClass = useWindowSizeClass({
    window: options.window ?? window,
  });

  const navigationMode = getNavigationMode(
    windowSizeClass,
    options.preferredNavigationMode,
  );

  const standardAside = windowSizeClass?.extraLargeAndUp
    ? { maxWidth: 400 }
    : undefined;

  switch (layout) {
    case 'listDetail':
      if (windowSizeClass?.compact) {
        return {
          windowSizeClass,
          navigationMode,
          orientation: 'horizontal',
          panes: [{ name: 'listDetail' }],
          standardAside,
        };
      }

      if (windowSizeClass?.medium) {
        return options?.dense
          ? {
              windowSizeClass,
              navigationMode,
              orientation: 'horizontal',
              panes: [{ name: 'list' }, { name: 'detail' }],
              standardAside,
            }
          : {
              windowSizeClass,
              navigationMode,
              orientation: 'horizontal',
              panes: [{ name: 'listDetail' }],
              standardAside,
            };
      }

      if (windowSizeClass?.expanded) {
        return {
          windowSizeClass,
          navigationMode,
          orientation: 'horizontal',
          panes: [{ name: 'list' }, { name: 'detail' }],
          standardAside,
        };
      }

      return {
        windowSizeClass,
        navigationMode,
        orientation: 'horizontal',
        panes: [{ name: 'list' }, { name: 'detail' }],
        standardAside,
      };

    case 'supportingPane':
      if (windowSizeClass?.compact) {
        return {
          windowSizeClass,
          navigationMode,
          orientation: 'vertical',
          panes: [
            { name: 'focus' },
            { name: 'supporting', type: 'bottomSheet' },
          ],
          standardAside,
        };
      }

      if (windowSizeClass?.medium) {
        return {
          windowSizeClass,
          navigationMode,
          orientation: 'vertical',
          panes: [{ name: 'focus' }, { name: 'supporting' }],
          standardAside,
        };
      }

      if (windowSizeClass?.expanded) {
        return {
          windowSizeClass,
          navigationMode,
          orientation: 'horizontal',
          panes: [{ name: 'focus' }, { name: 'supporting', type: 'aside' }],
          standardAside: { maxWidth: 360 },
        };
      }

      return {
        windowSizeClass,
        navigationMode,
        orientation: 'horizontal',
        panes: [{ name: 'focus' }, { name: 'supporting', type: 'aside' }],
        standardAside: { maxWidth: 360 },
      };

    case 'feed':
      if (windowSizeClass?.compact) {
        return {
          windowSizeClass,
          navigationMode,
          orientation: 'vertical',
          panes: [{ name: 'feed' }],
          standardAside,
        };
      }

      if (windowSizeClass?.medium) {
        return {
          windowSizeClass,
          navigationMode,
          panes: [{ name: 'feed' }],
          standardAside,
        };
      }

      return {
        windowSizeClass,
        navigationMode,
        panes: [{ name: 'feed' }],
        standardAside,
      };
  }
};
