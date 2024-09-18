import type { IBaseProps } from '~/components/Base';
import type { IAppLayoutFooterStylesKey } from './AppLayoutFooter.styles';

export type IAppLayoutFooterProps = IBaseProps<IAppLayoutFooterStylesKey> & {
  children?: React.ReactNode;
  divider?: boolean;
};
