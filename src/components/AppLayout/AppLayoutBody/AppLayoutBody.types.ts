import type { IAppLayoutBodyStylesKey } from './AppLayoutBody.styles';
import type { IBaseProps } from '~/components/Base';

export type IAppLayoutBodyProps = IBaseProps<IAppLayoutBodyStylesKey> & {
  children?: React.ReactNode;
  followNavigationDrawer?: boolean;
  followAside?: boolean;
};
