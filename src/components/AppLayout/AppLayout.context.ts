import type { IAppLayoutProps } from './AppLayout.types';
import type { IPortalProps } from '../Portal';
import { createSafeContext } from '~/helpers/createSafeContext';

export type IAppLayoutContextValue = Pick<
  IAppLayoutProps,
  'window' | 'navigationDrawer' | 'aside'
> & {
  root?: IPortalProps['root'];
};

export const [AppLayoutProvider, useAppLayoutContext] =
  createSafeContext<IAppLayoutContextValue>(
    'You forgot to wrap your component in <AppLayoutProvider />.',
  );
