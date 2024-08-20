import type { IAppLayoutNavigationStylesKey } from './AppLayoutNavigation.styles';
import type { IBaseProps } from '~/components/Base';

export type IAppLayoutNavigationProps =
  IBaseProps<IAppLayoutNavigationStylesKey> & {
    children?: React.ReactNode;
  };
