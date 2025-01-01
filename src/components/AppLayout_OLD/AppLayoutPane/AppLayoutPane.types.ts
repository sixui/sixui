import type { IBaseProps } from '~/components/Base';
import type { IAppLayoutPaneStylesKey } from './AppLayoutPane.styles';

export type IAppLayoutPaneProps = IBaseProps<IAppLayoutPaneStylesKey> & {
  children?: React.ReactNode;
};
