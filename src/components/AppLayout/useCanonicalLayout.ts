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
  sheet?: boolean;
  fixedWidth?: number;
  dismissible?: boolean;
  columns?: number;
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

  if (windowSizeClass?.expandedAndUp) {
    return preferredNavigationMode;
  }

  return preferredNavigationMode;
};

export type ICanonicalLayout = {
  navigationMode: ICanonicalLayoutNavigationMode;
  orientation: 'horizontal' | 'vertical';
  panes: Array<ICanonicalLayoutPane>;
  standardAside?: {
    maxWidth?: number;
  };
};

const defaultOptions = {
  preferredNavigationMode: 'standard' as 'rail' | 'standard',
};

export const useCanonicalLayout = (
  layout: ICanonicalLayoutType,
  optionsProp?: ICanonicalLayoutOptions,
): ICanonicalLayout => {
  const options = {
    ...defaultOptions,
    ...optionsProp,
  };
  console.log('___-options', options.window);
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
          navigationMode,
          orientation: 'horizontal',
          panes: [{ name: 'listDetail' }],
          standardAside,
        };
      }

      if (windowSizeClass?.medium) {
        return options?.dense
          ? {
              navigationMode: 'bar',
              orientation: 'horizontal',
              panes: [{ name: 'list' }, { name: 'detail' }],
              standardAside,
            }
          : {
              navigationMode,
              orientation: 'horizontal',
              panes: [{ name: 'listDetail' }],
              standardAside,
            };
      }

      return {
        navigationMode,
        orientation: 'horizontal',
        panes: [{ name: 'list' }, { name: 'detail' }],
        standardAside,
      };

    case 'supportingPane':
      if (windowSizeClass?.compact) {
        return {
          navigationMode,
          orientation: 'vertical',
          panes: [{ name: 'focus' }, { name: 'supporting', sheet: true }],
          standardAside,
        };
      }

      if (windowSizeClass?.medium) {
        return {
          navigationMode,
          orientation: 'vertical',
          panes: [{ name: 'focus' }, { name: 'supporting' }],
          standardAside,
        };
      }

      return {
        navigationMode,
        orientation: 'horizontal',
        panes: [
          { name: 'focus' },
          { name: 'supporting', fixedWidth: 360, dismissible: true },
        ],
        standardAside,
      };

    case 'feed':
      if (windowSizeClass?.compact) {
        return {
          navigationMode,
          orientation: 'vertical',
          panes: [{ name: 'feed', columns: 1 }],
          standardAside,
        };
      }

      if (windowSizeClass?.medium) {
        return {
          navigationMode,
          orientation: 'vertical',
          panes: [{ name: 'feed', columns: 2 }],
          standardAside,
        };
      }

      return {
        navigationMode,
        orientation: 'horizontal',
        panes: [{ name: 'feed', columns: 3 }],
        standardAside,
      };
  }
};
