import type { IBaseProps } from '~/components/Base';
import type { IAppLayoutHeaderStylesKey } from './AppLayoutHeader.styles';

export type IAppLayoutHeaderProps = IBaseProps<IAppLayoutHeaderStylesKey> & {
  children?: React.ReactNode;
  divider?: boolean;
};
