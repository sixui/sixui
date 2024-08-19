import type { IAppLayoutListDetailBodyStylesKey } from './AppLayoutListDetailBody.styles';
import type { IBaseProps } from '~/components/Base';

export type IAppLayoutListDetailBodyRenderProps = {
  recommendedVisiblePanes: number;
};

export type IAppLayoutListDetailBodyProps =
  IBaseProps<IAppLayoutListDetailBodyStylesKey> & {
    children?:
      | ((props: IAppLayoutListDetailBodyRenderProps) => React.ReactNode)
      | React.ReactNode;
  };
