import type { IAppShellHeaderStylesKey } from './AppShellHeader.styles';
import type { IBaseProps } from '~/components/Base';

export type IAppShellHeaderProps = IBaseProps<IAppShellHeaderStylesKey> & {
  children?: React.ReactNode;
};
