import type { ISideSheetType } from '~/hooks/useSideSheet';
import type { IPortalProps } from '../Portal';
import type {
  IAppLayoutComponentName,
  IAppLayoutNavigationMode,
  IAppLayoutProps,
} from './AppLayout.types';
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
  'window' | 'preferredNavigationMode'
> & {
  navigationDrawer?: IAppLayoutProps['navigationDrawer'] & {
    state?: IAppLayoutSideSheetState;
  };
  aside?: IAppLayoutProps['aside'] & {
    state?: IAppLayoutSideSheetState;
  };
  root?: IPortalProps['root'];
  navigationMode: IAppLayoutNavigationMode;
  components: Array<IAppLayoutComponentName>;
};

export const [AppLayoutProvider, useAppLayoutContext] =
  createSafeContext<IAppLayoutContextValue>(
    'You forgot to wrap your component in <AppLayoutProvider />.',
  );
