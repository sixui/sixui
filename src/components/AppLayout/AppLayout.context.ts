import type {
  IAppLayoutComponentName,
  IAppLayoutProps,
} from './AppLayout.types';
import type { IPortalProps } from '../Portal';
import type { ICanonicalLayout } from './useCanonicalLayout';
import type { ISideSheetType } from '../SideSheet';
import { createSafeContext } from '~/helpers/createSafeContext';

export type IAppLayoutSideSheetState = {
  opened: boolean;
  type: ISideSheetType;
  modalOpened: boolean;
  standardOpened: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
};

export type IAppLayoutContextValue = Pick<
  IAppLayoutProps,
  'window' | 'navigationRail' | 'preferredNavigationMode'
> & {
  navigationDrawer?: IAppLayoutProps['navigationDrawer'] & {
    state?: IAppLayoutSideSheetState;
  };
  aside?: IAppLayoutProps['aside'] & {
    state?: IAppLayoutSideSheetState;
  };
  root?: IPortalProps['root'];
  canonicalLayout: ICanonicalLayout;
  components: Array<IAppLayoutComponentName>;
};

export const [AppLayoutProvider, useAppLayoutContext] =
  createSafeContext<IAppLayoutContextValue>(
    'You forgot to wrap your component in <AppLayoutProvider />.',
  );
