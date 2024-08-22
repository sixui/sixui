import type { IAppLayoutHeaderStylesKey } from './AppLayoutHeader.styles';
import type { IBaseProps } from '~/components/Base';

export type IAppLayoutHeaderProps = IBaseProps<IAppLayoutHeaderStylesKey> & {
  children?: React.ReactNode;
  divider?: boolean;
};
