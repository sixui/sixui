import type { ISideSheetType } from '~/hooks/useSideSheet';
import type {
  IAppLayoutComponentName,
  IAppLayoutNavigationMode,
  IAppLayoutProps,
} from './AppLayout.types';
import { createOptionalContext } from '~/helpers/createOptionalContext';

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
  root?: HTMLElement | null;
  navigationMode: IAppLayoutNavigationMode;
  components: Array<IAppLayoutComponentName>;
};

export const [AppLayoutProvider, useAppLayoutContext] =
  createOptionalContext<IAppLayoutContextValue>();
