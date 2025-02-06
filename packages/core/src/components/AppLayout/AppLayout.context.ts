import type { ISideSheetType } from '~/hooks/useSideSheet';
import type {
  IAppLayoutComponentName,
  IAppLayoutNavigationMode,
  IAppLayoutProps,
} from './AppLayout.types';
import { createOptionalContext } from '~/utils/react/createOptionalContext';

interface IAppLayoutDisclosureState {
  opened: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

export interface IAppLayoutSideSheetState extends IAppLayoutDisclosureState {
  opened: boolean;
  drawer: boolean;
  type: ISideSheetType;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

export type IAppLayoutContextValue = Pick<
  IAppLayoutProps,
  'window' | 'preferredNavigationMode'
> & {
  navigationDrawer?: IAppLayoutProps['navigationDrawer'] & {
    state?: IAppLayoutSideSheetState;
  };
  sideSheet?: IAppLayoutProps['sideSheet'] & {
    state?: IAppLayoutSideSheetState;
  };
  bottomSheet?: {
    state?: IAppLayoutDisclosureState;
  };
  root?: HTMLElement | null;
  navigationMode: IAppLayoutNavigationMode;
  components: Array<IAppLayoutComponentName>;
};

export const [AppLayoutProvider, useAppLayoutContext] =
  createOptionalContext<IAppLayoutContextValue>();
