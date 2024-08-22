import type { IAppLayoutFooterStylesKey } from './AppLayoutFooter.styles';
import type { IBaseProps } from '~/components/Base';

export type IAppLayoutFooterProps = IBaseProps<IAppLayoutFooterStylesKey> & {
  children?: React.ReactNode;
  divider?: boolean;
};
