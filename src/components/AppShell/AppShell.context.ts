import type { IAppShellProps } from './AppShell.types';
import type { IPortalProps } from '../Portal';
import { createSafeContext } from '~/helpers/createSafeContext';

export type IAppShellContextValue = Pick<
  IAppShellProps,
  'navigationDrawer' | 'aside'
> & {
  root?: IPortalProps['root'];
};

export const [AppShellProvider, useAppShellContext] =
  createSafeContext<IAppShellContextValue>(
    'You forgot to wrap your component in <AppShellProvider />.',
  );
