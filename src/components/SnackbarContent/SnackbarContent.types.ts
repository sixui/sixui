import type {
  IZeroOrMore,
  ICompiledStyles,
  IMaybeAsync,
  IAny,
} from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { ISnackbarContentStylesKey } from './SnackbarContent.styles';
import type { IElevationStylesKey } from '../Elevation';

export type ISnackbarContentProps = IBaseProps<ISnackbarContentStylesKey> & {
  innerStyles?: {
    elevation?: IZeroOrMore<ICompiledStyles<IElevationStylesKey>>;
  };
  children?: React.ReactNode;
  actionLabel?: string;
  onActionClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
  onClose?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
  showCloseButton?: boolean;
};
