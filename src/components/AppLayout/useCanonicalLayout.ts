import { useWindowSizeClass } from '~/hooks/useWindowSizeClass';
import { useAppLayoutContext } from './AppLayout.context';

export type ICanonicalLayoutType = 'listDetail' | 'supportingPane' | 'feed';

export type ICanonicalLayoutNavigationType = 'bar' | 'rail' | 'standard';

export type ICanonicalLayoutOptions = {
  dense?: boolean;
};

export type ICanonicalLayoutPane = {
  name: 'main' | 'list' | 'detail' | 'focus' | 'supporting' | 'feed';
  sheet?: boolean;
  fixedWidth?: number;
  dismissible?: boolean;
  columns?: number;
};

export type ICanonicalLayoutNavigation = Partial<
  Record<ICanonicalLayoutNavigationType, boolean>
>;

export type IUseCanonicalLayoutResult = {
  navigation: ICanonicalLayoutNavigation;
  orientation: 'horizontal' | 'vertical';
  panes: Array<ICanonicalLayoutPane>;
};

export const useCanonicalLayout = (
  layout: ICanonicalLayoutType,
  options?: ICanonicalLayoutOptions,
): IUseCanonicalLayoutResult => {
  const appShellContext = useAppLayoutContext();
  const windowSizeClass = useWindowSizeClass({
    window: appShellContext.window,
  });

  const navigation: ICanonicalLayoutNavigation = {
    bar: windowSizeClass?.compact,
    rail: windowSizeClass?.medium || windowSizeClass?.expanded,
    standard: windowSizeClass?.largeAndUp,
  };

  switch (layout) {
    case 'listDetail':
      if (windowSizeClass?.compact) {
        return {
          navigation,
          orientation: 'horizontal',
          panes: [{ name: 'main' }],
        };
      }

      if (windowSizeClass?.medium) {
        return options?.dense
          ? {
              navigation: { bar: true },
              orientation: 'horizontal',
              panes: [{ name: 'list' }, { name: 'detail' }],
            }
          : {
              navigation,
              orientation: 'horizontal',
              panes: [{ name: 'main' }],
            };
      }

      return {
        navigation,
        orientation: 'horizontal',
        panes: [{ name: 'list' }, { name: 'detail' }],
      };

    case 'supportingPane':
      if (windowSizeClass?.compact) {
        return {
          navigation,
          orientation: 'vertical',
          panes: [{ name: 'focus' }, { name: 'supporting', sheet: true }],
        };
      }

      if (windowSizeClass?.medium) {
        return {
          navigation,
          orientation: 'vertical',
          panes: [{ name: 'focus' }, { name: 'supporting' }],
        };
      }

      return {
        navigation,
        orientation: 'horizontal',
        panes: [
          { name: 'focus' },
          { name: 'supporting', fixedWidth: 360, dismissible: true },
        ],
      };

    case 'feed':
      if (windowSizeClass?.compact) {
        return {
          navigation,
          orientation: 'vertical',
          panes: [{ name: 'feed', columns: 1 }],
        };
      }

      if (windowSizeClass?.medium) {
        return {
          navigation,
          orientation: 'vertical',
          panes: [{ name: 'feed', columns: 2 }],
        };
      }

      return {
        navigation,
        orientation: 'horizontal',
        panes: [{ name: 'feed', columns: 3 }],
      };
  }
};
