import type { IAppLayoutPaneStylesKey } from './AppLayoutPane.styles';
import type { IBaseProps } from '~/components/Base';

export type IAppLayoutPaneProps = IBaseProps<IAppLayoutPaneStylesKey> & {
  children?: React.ReactNode;
};
