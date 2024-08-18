import type { IBaseProps } from '~/components/Base';
import type { ISideSheetProps } from '~/components/SideSheet';
import type { IOmit } from '~/helpers/types';
import type { IAppShellAsideStylesKey } from './AppShellAside.styles';

export type IAppShellAsideProps = IBaseProps<IAppShellAsideStylesKey> &
  IOmit<ISideSheetProps, 'styles'>;
