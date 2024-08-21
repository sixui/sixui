import type { IStackProps } from '~/components/Stack';
import type { IOmit } from '~/helpers/types';
import type { IBaseProps } from '~/components/Base';
import type { IAppLayoutBodyStylesKey } from './AppLayoutBody.styles';

export type IAppLayoutBodyProps = IBaseProps<IAppLayoutBodyStylesKey> &
  IOmit<IStackProps, 'styles'> & {
    children?: React.ReactNode;
  };
