import type { IAppLayoutProps } from './AppLayout.types';
import type { IPortalProps } from '../Portal';
import type { ICanonicalLayout } from './useCanonicalLayout';
import type { ISideSheetType } from '../SideSheet';
import { createSafeContext } from '~/helpers/createSafeContext';

export type IAppLayoutContextValue = Pick<
  IAppLayoutProps,
  'header' | 'window' | 'navigationRail' | 'aside' | 'preferredNavigationMode'
> & {
  navigationDrawer?: IAppLayoutProps['navigationDrawer'] & {
    state: {
      opened: boolean;
      type: ISideSheetType;
      modalOpened: boolean;
      standardOpened: boolean;
      toggle: () => void;
      open: () => void;
      close: () => void;
    };
  };
  root?: IPortalProps['root'];
  canonicalLayout: ICanonicalLayout;
};

export const [AppLayoutProvider, useAppLayoutContext] =
  createSafeContext<IAppLayoutContextValue>(
    'You forgot to wrap your component in <AppLayoutProvider />.',
  );
