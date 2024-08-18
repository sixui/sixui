import type { IAppLayoutPanesStylesKey } from './AppLayoutPanes.styles';
import type { IBaseProps } from '~/components/Base';

export type IAppLayoutPanesProps = IBaseProps<IAppLayoutPanesStylesKey> & {
  children?: React.ReactNode;
};
