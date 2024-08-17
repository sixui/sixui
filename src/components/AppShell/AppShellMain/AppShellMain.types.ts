import type { IAppShellMainStylesKey } from './AppShellMain.styles';
import type { IBaseProps } from '~/components/Base';

export type IAppShellMainProps = IBaseProps<IAppShellMainStylesKey> & {
  children?: React.ReactNode;
};
