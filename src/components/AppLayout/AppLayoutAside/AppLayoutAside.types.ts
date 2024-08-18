import type { IBaseProps } from '~/components/Base';
import type { ISideSheetProps } from '~/components/SideSheet';
import type { IOmit } from '~/helpers/types';
import type { IAppLayoutAsideStylesKey } from './AppLayoutAside.styles';

export type IAppLayoutAsideProps = IBaseProps<IAppLayoutAsideStylesKey> &
  IOmit<ISideSheetProps, 'styles'>;
