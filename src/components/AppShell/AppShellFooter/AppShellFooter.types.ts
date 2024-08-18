import type { IAppShellFooterStylesKey } from './AppShellFooter.styles';
import type { IBaseProps } from '~/components/Base';

export type IAppShellFooterProps = IBaseProps<IAppShellFooterStylesKey> & {
  children?: React.ReactNode;
};
