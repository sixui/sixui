import type { IPortalProps } from '../Portal';
import type { IAppShellNavigationDrawerProps } from './AppShell.types';
import { createSafeContext } from '~/helpers/createSafeContext';

export type IAppShellContextValue = {
  root?: IPortalProps['root'];
  navigationDrawer?: IAppShellNavigationDrawerProps;
};

export const [AppShellProvider, useAppShellContext] =
  createSafeContext<IAppShellContextValue>(
    'You forgot to wrap your component in <AppShellProvider />.',
  );
